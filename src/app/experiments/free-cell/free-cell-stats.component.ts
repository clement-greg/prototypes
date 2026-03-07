import { Component, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { FreeCellStatsService, GameRecord } from './free-cell-stats.service';

Chart.register(...registerables);

@Component({
  selector: 'app-free-cell-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './free-cell-stats.component.html',
  styleUrl: './free-cell-stats.component.scss',
})
export class FreeCellStatsComponent implements OnDestroy {
  @ViewChild('winLossChart') winLossCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('movesChart') movesCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('durationChart') durationCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('timelineChart') timelineCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('movesHistogramChart') movesHistogramCanvas!: ElementRef<HTMLCanvasElement>;

  visible = false;
  games: GameRecord[] = [];
  totalGames = 0;
  totalWins = 0;
  totalLosses = 0;
  winRate = 0;
  avgMovesWin = 0;
  avgMovesLoss = 0;
  avgDurationWin = '';
  avgDurationLoss = '';
  bestMoves = 0;
  bestTime = '';
  currentStreak = 0;
  longestStreak = 0;

  private charts: Chart[] = [];

  constructor(private stats: FreeCellStatsService) {}

  ngOnDestroy() {
    this.destroyCharts();
  }

  async open() {
    this.games = await this.stats.getAllGames();
    this.games.sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime());
    this.computeSummary();
    this.visible = true;
    // Wait for Angular to render the template, then draw charts
    setTimeout(() => this.renderCharts(), 0);
  }

  async removeGame(game: GameRecord) {
    if (game.id == null) return;
    await this.stats.deleteGame(game.id);
    this.games = this.games.filter(g => g.id !== game.id);
    this.computeSummary();
    this.destroyCharts();
    setTimeout(() => this.renderCharts(), 0);
  }

  close() {
    this.visible = false;
    this.destroyCharts();
  }

  onOverlayClick(event: MouseEvent) {
    // Close when clicking the backdrop, not the panel itself
    if ((event.target as HTMLElement).classList.contains('stats-overlay')) {
      this.close();
    }
  }

  private computeSummary() {
    const completed = this.games.filter(g => g.result !== 'in-progress');
    this.totalGames = completed.length;
    const wins = completed.filter(g => g.result === 'win');
    const losses = completed.filter(g => g.result === 'loss');
    this.totalWins = wins.length;
    this.totalLosses = losses.length;
    this.winRate = this.totalGames > 0 ? Math.round((this.totalWins / this.totalGames) * 100) : 0;

    this.avgMovesWin = wins.length > 0
      ? Math.round(wins.reduce((s, g) => s + g.moves, 0) / wins.length)
      : 0;
    this.avgMovesLoss = losses.length > 0
      ? Math.round(losses.reduce((s, g) => s + g.moves, 0) / losses.length)
      : 0;

    const avgDurWin = wins.length > 0
      ? Math.round(wins.reduce((s, g) => s + g.durationSeconds, 0) / wins.length)
      : 0;
    const avgDurLoss = losses.length > 0
      ? Math.round(losses.reduce((s, g) => s + g.durationSeconds, 0) / losses.length)
      : 0;

    this.avgDurationWin = this.fmtDuration(avgDurWin);
    this.avgDurationLoss = this.fmtDuration(avgDurLoss);

    if (wins.length > 0) {
      this.bestMoves = Math.min(...wins.map(g => g.moves));
      this.bestTime = this.fmtDuration(Math.min(...wins.map(g => g.durationSeconds)));
    }

    // Streaks
    let streak = 0, maxStreak = 0;
    for (const g of completed) {
      if (g.result === 'win') { streak++; maxStreak = Math.max(maxStreak, streak); }
      else { streak = 0; }
    }
    this.currentStreak = streak;
    this.longestStreak = maxStreak;
  }

  private renderCharts() {
    if (!this.games.length) return;
    this.destroyCharts();

    this.renderWinLossChart();
    this.renderMovesChart();
    this.renderDurationChart();
    this.renderTimelineChart();
    this.renderMovesHistogram();
  }

  private renderWinLossChart() {
    const ctx = this.winLossCanvas?.nativeElement?.getContext('2d');
    if (!ctx) return;

    this.charts.push(new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Wins', 'Losses'],
        datasets: [{
          data: [this.totalWins, this.totalLosses],
          backgroundColor: ['#4caf50', '#f44336'],
          borderColor: ['#388e3c', '#d32f2f'],
          borderWidth: 2,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { color: '#e0e0e0', font: { size: 14 } } },
          title: { display: true, text: 'Win / Loss Ratio', color: '#fff', font: { size: 16 } },
        }
      }
    }));
  }

  private renderMovesChart() {
    const ctx = this.movesCanvas?.nativeElement?.getContext('2d');
    if (!ctx) return;

    const completed = this.games
      .filter(g => g.result !== 'in-progress')
      .slice(-30); // last 30 games

    this.charts.push(new Chart(ctx, {
      type: 'bar',
      data: {
        labels: completed.map((_, i) => `#${i + 1}`),
        datasets: [{
          label: 'Moves',
          data: completed.map(g => g.moves),
          backgroundColor: completed.map(g => g.result === 'win' ? '#66bb6a' : '#ef5350'),
          borderRadius: 4,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          title: { display: true, text: 'Moves per Game (Last 30)', color: '#fff', font: { size: 16 } },
        },
        scales: {
          x: { ticks: { color: '#bbb' }, grid: { color: 'rgba(255,255,255,0.08)' } },
          y: { ticks: { color: '#bbb' }, grid: { color: 'rgba(255,255,255,0.08)' },
               title: { display: true, text: 'Moves', color: '#ccc' } },
        }
      }
    }));
  }

  private renderDurationChart() {
    const ctx = this.durationCanvas?.nativeElement?.getContext('2d');
    if (!ctx) return;

    const completed = this.games
      .filter(g => g.result !== 'in-progress')
      .slice(-30);

    this.charts.push(new Chart(ctx, {
      type: 'bar',
      data: {
        labels: completed.map((_, i) => `#${i + 1}`),
        datasets: [{
          label: 'Duration (seconds)',
          data: completed.map(g => g.durationSeconds),
          backgroundColor: completed.map(g => g.result === 'win' ? '#42a5f5' : '#ff7043'),
          borderRadius: 4,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          title: { display: true, text: 'Duration per Game (Last 30)', color: '#fff', font: { size: 16 } },
        },
        scales: {
          x: { ticks: { color: '#bbb' }, grid: { color: 'rgba(255,255,255,0.08)' } },
          y: { ticks: { color: '#bbb' }, grid: { color: 'rgba(255,255,255,0.08)' },
               title: { display: true, text: 'Seconds', color: '#ccc' } },
        }
      }
    }));
  }

  private renderTimelineChart() {
    const ctx = this.timelineCanvas?.nativeElement?.getContext('2d');
    if (!ctx) return;

    const completed = this.games.filter(g => g.result !== 'in-progress');

    // Group by date
    const dateMap = new Map<string, { wins: number; losses: number }>();
    for (const g of completed) {
      const day = new Date(g.startedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      if (!dateMap.has(day)) dateMap.set(day, { wins: 0, losses: 0 });
      const entry = dateMap.get(day)!;
      if (g.result === 'win') entry.wins++;
      else entry.losses++;
    }

    const labels = [...dateMap.keys()];
    const wins = labels.map(d => dateMap.get(d)!.wins);
    const losses = labels.map(d => dateMap.get(d)!.losses);

    this.charts.push(new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          { label: 'Wins', data: wins, backgroundColor: '#4caf50', borderRadius: 4 },
          { label: 'Losses', data: losses, backgroundColor: '#f44336', borderRadius: 4 },
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { color: '#e0e0e0' } },
          title: { display: true, text: 'Games by Day', color: '#fff', font: { size: 16 } },
        },
        scales: {
          x: { stacked: true, ticks: { color: '#bbb', maxRotation: 45 }, grid: { color: 'rgba(255,255,255,0.08)' } },
          y: { stacked: true, ticks: { color: '#bbb', stepSize: 1 }, grid: { color: 'rgba(255,255,255,0.08)' },
               title: { display: true, text: 'Games', color: '#ccc' } },
        }
      }
    }));
  }

  private renderMovesHistogram() {
    const ctx = this.movesHistogramCanvas?.nativeElement?.getContext('2d');
    if (!ctx) return;

    const wins = this.games.filter(g => g.result === 'win');
    if (wins.length === 0) return;

    // Bucket into ranges of 10
    const buckets: Record<string, number> = {};
    for (const g of wins) {
      const bucket = Math.floor(g.moves / 10) * 10;
      const label = `${bucket}-${bucket + 9}`;
      buckets[label] = (buckets[label] || 0) + 1;
    }

    const sortedLabels = Object.keys(buckets).sort((a, b) => parseInt(a) - parseInt(b));

    this.charts.push(new Chart(ctx, {
      type: 'bar',
      data: {
        labels: sortedLabels,
        datasets: [{
          label: 'Wins',
          data: sortedLabels.map(l => buckets[l]),
          backgroundColor: '#7e57c2',
          borderRadius: 4,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          title: { display: true, text: 'Win Distribution by Move Count', color: '#fff', font: { size: 16 } },
        },
        scales: {
          x: { ticks: { color: '#bbb' }, grid: { color: 'rgba(255,255,255,0.08)' },
               title: { display: true, text: 'Moves', color: '#ccc' } },
          y: { ticks: { color: '#bbb', stepSize: 1 }, grid: { color: 'rgba(255,255,255,0.08)' },
               title: { display: true, text: 'Games', color: '#ccc' } },
        }
      }
    }));
  }

  private destroyCharts() {
    for (const c of this.charts) c.destroy();
    this.charts = [];
  }

  fmtDuration(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  fmtDate(d: Date | string | null): string {
    if (!d) return '—';
    return new Date(d).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
      hour: 'numeric', minute: '2-digit',
    });
  }
}

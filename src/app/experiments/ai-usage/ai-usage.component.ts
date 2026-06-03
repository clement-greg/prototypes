import { Component, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface AiUsageRow {
  date: string;
  username: string;
  model: string;
  quantity: number;
}

@Component({
  selector: 'app-ai-usage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ai-usage.component.html',
  styleUrl: './ai-usage.component.scss',
})
export class AiUsageComponent implements OnDestroy {
  @ViewChild('dateChart') dateCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('userChart') userCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('modelChart') modelCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('userDateChart') userDateCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('userModelChart') userModelCanvas!: ElementRef<HTMLCanvasElement>;

  rows: AiUsageRow[] = [];
  fileName = '';
  totalQuantity = 0;
  uniqueUsers = 0;
  uniqueModels = 0;
  dateRange = '';

  private charts: Chart[] = [];

  ngOnDestroy() {
    this.destroyCharts();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    this.fileName = file.name;
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      this.parseCsv(text);
      this.computeSummary();
      this.destroyCharts();
      setTimeout(() => this.renderCharts(), 0);
    };
    reader.readAsText(file);
  }

  private parseCsv(text: string) {
    const lines = text.trim().split('\n');
    if (lines.length < 2) return;

    const headers = this.parseCsvRow(lines[0]);
    const dateIdx = headers.indexOf('date');
    const userIdx = headers.indexOf('username');
    const modelIdx = headers.indexOf('model');
    const qtyIdx = headers.indexOf('quantity');

    this.rows = [];
    for (let i = 1; i < lines.length; i++) {
      const cols = this.parseCsvRow(lines[i]);
      if (cols.length < 4) continue;
      this.rows.push({
        date: cols[dateIdx] || '',
        username: cols[userIdx] || '',
        model: cols[modelIdx] || '',
        quantity: parseFloat(cols[qtyIdx]) || 0,
      });
    }
  }

  private parseCsvRow(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        inQuotes = !inQuotes;
      } else if (ch === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += ch;
      }
    }
    result.push(current.trim());
    return result;
  }

  private computeSummary() {
    this.totalQuantity = this.rows.reduce((s, r) => s + r.quantity, 0);
    this.uniqueUsers = new Set(this.rows.map(r => r.username)).size;
    this.uniqueModels = new Set(this.rows.map(r => r.model)).size;

    const dates = this.rows.map(r => r.date).sort();
    if (dates.length) {
      this.dateRange = `${dates[0]} – ${dates[dates.length - 1]}`;
    }
  }

  private renderCharts() {
    if (!this.rows.length) return;
    this.renderDateChart();
    this.renderUserChart();
    this.renderModelChart();
    this.renderUserDateChart();
    this.renderUserModelChart();
  }

  private renderDateChart() {
    const ctx = this.dateCanvas?.nativeElement?.getContext('2d');
    if (!ctx) return;

    const dateMap = new Map<string, number>();
    for (const r of this.rows) {
      dateMap.set(r.date, (dateMap.get(r.date) || 0) + r.quantity);
    }
    const labels = [...dateMap.keys()].sort();
    const data = labels.map(d => dateMap.get(d)!);

    this.charts.push(new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'AI Credits',
          data,
          borderColor: '#42a5f5',
          backgroundColor: 'rgba(66,165,245,0.15)',
          fill: true,
          tension: 0.3,
          pointRadius: 5,
          pointBackgroundColor: '#42a5f5',
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          title: { display: true, text: 'Usage by Date', color: '#fff', font: { size: 16 } },
        },
        scales: {
          x: { ticks: { color: '#bbb', maxRotation: 45 }, grid: { color: 'rgba(255,255,255,0.08)' } },
          y: {
            ticks: { color: '#bbb' },
            grid: { color: 'rgba(255,255,255,0.08)' },
            title: { display: true, text: 'AI Credits', color: '#ccc' },
          },
        },
      },
    }));
  }

  private renderUserChart() {
    const ctx = this.userCanvas?.nativeElement?.getContext('2d');
    if (!ctx) return;

    const userMap = new Map<string, number>();
    for (const r of this.rows) {
      userMap.set(r.username, (userMap.get(r.username) || 0) + r.quantity);
    }
    const sorted = [...userMap.entries()].sort((a, b) => b[1] - a[1]);
    const labels = sorted.map(([u]) => u);
    const data = sorted.map(([, q]) => q);
    const colors = labels.map((_, i) => `hsl(${Math.round(i * 360 / labels.length)}, 70%, 60%)`);

    this.charts.push(new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'AI Credits',
          data,
          backgroundColor: colors,
          borderRadius: 4,
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          title: { display: true, text: 'Usage by User', color: '#fff', font: { size: 16 } },
        },
        scales: {
          x: {
            ticks: { color: '#bbb' },
            grid: { color: 'rgba(255,255,255,0.08)' },
            title: { display: true, text: 'AI Credits', color: '#ccc' },
          },
          y: { ticks: { color: '#bbb' }, grid: { color: 'rgba(255,255,255,0.08)' } },
        },
      },
    }));
  }

  private renderModelChart() {
    const ctx = this.modelCanvas?.nativeElement?.getContext('2d');
    if (!ctx) return;

    const modelMap = new Map<string, number>();
    for (const r of this.rows) {
      modelMap.set(r.model, (modelMap.get(r.model) || 0) + r.quantity);
    }
    const sorted = [...modelMap.entries()].sort((a, b) => b[1] - a[1]);
    const labels = sorted.map(([m]) => m);
    const data = sorted.map(([, q]) => q);

    const palette = [
      '#42a5f5', '#66bb6a', '#ff7043', '#ab47bc', '#26c6da',
      '#ffca28', '#ec407a', '#7e57c2', '#29b6f6', '#ffa726',
      '#ef5350', '#26a69a',
    ];

    this.charts.push(new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: labels.map((_, i) => palette[i % palette.length]),
          borderColor: labels.map((_, i) => palette[i % palette.length] + '99'),
          borderWidth: 2,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: { color: '#e0e0e0', font: { size: 12 }, padding: 14 },
          },
          title: { display: true, text: 'Usage by Model', color: '#fff', font: { size: 16 } },
        },
      },
    }));
  }

  private renderUserModelChart() {
    const ctx = this.userModelCanvas?.nativeElement?.getContext('2d');
    if (!ctx) return;

    // Users sorted by total usage descending
    const userTotals = new Map<string, number>();
    for (const r of this.rows) {
      userTotals.set(r.username, (userTotals.get(r.username) || 0) + r.quantity);
    }
    const users = [...userTotals.keys()].sort((a, b) => userTotals.get(b)! - userTotals.get(a)!);

    // Models sorted by total usage descending
    const modelTotals = new Map<string, number>();
    for (const r of this.rows) {
      modelTotals.set(r.model, (modelTotals.get(r.model) || 0) + r.quantity);
    }
    const models = [...modelTotals.keys()].sort((a, b) => modelTotals.get(b)! - modelTotals.get(a)!);

    const palette = [
      '#42a5f5', '#66bb6a', '#ff7043', '#ab47bc', '#26c6da',
      '#ffca28', '#ec407a', '#7e57c2', '#ffa726', '#ef5350',
      '#26a69a', '#d4e157',
    ];

    const datasets = models.map((model, i) => {
      const color = palette[i % palette.length];
      return {
        label: model,
        data: users.map(user => {
          return this.rows
            .filter(r => r.username === user && r.model === model)
            .reduce((s, r) => s + r.quantity, 0);
        }),
        backgroundColor: color,
        borderColor: color + 'cc',
        borderWidth: 1,
        borderRadius: 2,
      };
    });

    this.charts.push(new Chart(ctx, {
      type: 'bar',
      data: { labels: users, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: '#e0e0e0', font: { size: 11 }, padding: 14, boxWidth: 16 },
          },
          title: { display: true, text: 'Usage by User & Model', color: '#fff', font: { size: 16 } },
        },
        scales: {
          x: {
            stacked: true,
            ticks: { color: '#bbb' },
            grid: { color: 'rgba(255,255,255,0.08)' },
          },
          y: {
            stacked: true,
            ticks: { color: '#bbb' },
            grid: { color: 'rgba(255,255,255,0.08)' },
            title: { display: true, text: 'AI Credits', color: '#ccc' },
          },
        },
      },
    }));
  }

  private renderUserDateChart() {
    const ctx = this.userDateCanvas?.nativeElement?.getContext('2d');
    if (!ctx) return;

    const allDates = [...new Set(this.rows.map(r => r.date))].sort();
    const users = [...new Set(this.rows.map(r => r.username))];

    // Sort users by total usage descending so legend order is meaningful
    users.sort((a, b) => {
      const sumA = this.rows.filter(r => r.username === a).reduce((s, r) => s + r.quantity, 0);
      const sumB = this.rows.filter(r => r.username === b).reduce((s, r) => s + r.quantity, 0);
      return sumB - sumA;
    });

    const palette = [
      '#42a5f5', '#66bb6a', '#ff7043', '#ab47bc', '#26c6da',
      '#ffca28', '#ec407a', '#7e57c2', '#ffa726', '#ef5350',
      '#26a69a', '#d4e157',
    ];

    const datasets = users.map((user, i) => {
      const color = palette[i % palette.length];
      const byDate = new Map<string, number>();
      for (const r of this.rows) {
        if (r.username === user) {
          byDate.set(r.date, (byDate.get(r.date) || 0) + r.quantity);
        }
      }
      return {
        label: user,
        data: allDates.map(d => byDate.get(d) ?? 0),
        borderColor: color,
        backgroundColor: color + '22',
        pointBackgroundColor: color,
        pointRadius: 4,
        tension: 0.3,
        fill: false,
      };
    });

    this.charts.push(new Chart(ctx, {
      type: 'line',
      data: { labels: allDates, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: '#e0e0e0', font: { size: 12 }, padding: 16, boxWidth: 20 },
          },
          title: { display: true, text: 'Daily Usage by User', color: '#fff', font: { size: 16 } },
        },
        scales: {
          x: { ticks: { color: '#bbb', maxRotation: 45 }, grid: { color: 'rgba(255,255,255,0.08)' } },
          y: {
            ticks: { color: '#bbb' },
            grid: { color: 'rgba(255,255,255,0.08)' },
            title: { display: true, text: 'AI Credits', color: '#ccc' },
          },
        },
      },
    }));
  }

  private destroyCharts() {
    for (const c of this.charts) c.destroy();
    this.charts = [];
  }

  formatNumber(n: number): string {
    return n.toLocaleString('en-US', { maximumFractionDigits: 1 });
  }
}

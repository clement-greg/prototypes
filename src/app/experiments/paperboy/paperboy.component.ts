import {
  Component, ViewChild, ElementRef, AfterViewInit, OnDestroy, ChangeDetectorRef, NgZone,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameEngine } from './game/engine';
import { Difficulty, HouseSummary, CANVAS_WIDTH, CANVAS_HEIGHT } from './game/types';

@Component({
  selector: 'app-paperboy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paperboy.component.html',
  styleUrls: ['./paperboy.component.scss'],
})
export class PaperboyComponent implements AfterViewInit, OnDestroy {
  @ViewChild('gameCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('gameContainer', { static: true }) containerRef!: ElementRef<HTMLDivElement>;

  private engine!: GameEngine;
  private resizeObserver?: ResizeObserver;

  // UI state (bound to template)
  score = 0;
  day = 1;
  papers = 12;
  lives = 3;
  livesArray: number[] = [1, 2, 3];
  highScore = 0;
  gameRunning = false;
  showTitleScreen = true;
  showDaySummary = false;
  showGameOver = false;
  gamepadConnected = false;
  difficulty: Difficulty = 'normal';
  summaryHouses: HouseSummary[] = [];

  constructor(private cdr: ChangeDetectorRef, private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    this.engine = new GameEngine();
    this.engine.init(this.canvasRef.nativeElement);

    // State change callback — runs outside Angular zone (from rAF)
    this.engine.onStateChange = (state) => {
      this.score = state.score;
      this.day = state.day;
      this.papers = state.papers;
      this.lives = state.lives;
      this.livesArray = Array.from({ length: state.lives }, (_, i) => i);
      this.highScore = state.highScore;
      this.gameRunning = state.phase === 'playing' || state.phase === 'training';
      this.showTitleScreen = state.phase === 'title';
      this.showGameOver = state.phase === 'gameOver';
      this.showDaySummary = state.phase === 'daySummary';
      this.gamepadConnected = this.engine.gamepadConnected;
    };

    this.engine.onDaySummary = (houses) => {
      this.summaryHouses = houses;
      this.cdr.detectChanges();
    };

    this.engine.onGameOver = () => {
      this.highScore = this.engine.highScore;
      this.cdr.detectChanges();
    };

    this.fitCanvas();
    this.resizeObserver = new ResizeObserver(() => this.fitCanvas());
    this.resizeObserver.observe(this.containerRef.nativeElement);

    // Poll gamepad status periodically for the indicator
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        const connected = this.engine.gamepadConnected;
        if (connected !== this.gamepadConnected) {
          this.gamepadConnected = connected;
          this.cdr.detectChanges();
        }
      }, 1000);
    });
  }

  startGame(): void {
    this.ngZone.runOutsideAngular(() => {
      this.engine.startGame(this.difficulty);
    });
    this.cdr.detectChanges();
  }

  nextDay(): void {
    this.ngZone.runOutsideAngular(() => {
      this.engine.nextDay();
    });
    this.cdr.detectChanges();
  }

  resetToTitle(): void {
    this.engine.resetToTitle();
    this.showTitleScreen = true;
    this.showGameOver = false;
    this.cdr.detectChanges();
  }

  /** Scale the canvas to fill the container while maintaining aspect ratio. */
  private fitCanvas(): void {
    const container = this.containerRef.nativeElement;
    const canvas = this.canvasRef.nativeElement;
    const containerW = container.clientWidth;
    const containerH = container.clientHeight;

    const scaleX = containerW / CANVAS_WIDTH;
    const scaleY = containerH / CANVAS_HEIGHT;
    const scale = Math.min(scaleX, scaleY);

    canvas.style.width = `${CANVAS_WIDTH * scale}px`;
    canvas.style.height = `${CANVAS_HEIGHT * scale}px`;
  }

  ngOnDestroy(): void {
    this.engine?.destroy();
    this.resizeObserver?.disconnect();
  }
}

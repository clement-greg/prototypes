/**
 * Paperboy Game – Main game engine.
 * Orchestrates game loop, state management, and all subsystems.
 */
import {
  GameState, GamePhase, Player, House, Obstacle, Newspaper, Particle,
  TrainingTarget, HouseSummary, Difficulty,
  CANVAS_WIDTH, CANVAS_HEIGHT, ROAD_LEFT, ROAD_RIGHT,
  PLAYER_BASE_SPEED, DIFFICULTY_SETTINGS, HOUSE_SPACING,
  CRASH_DURATION,
} from './types';
import { InputManager } from './input';
import { Renderer } from './renderer';
import { SoundManager } from './sound';
import {
  updatePlayer, updateNewspapers, updateObstacles,
  checkPlayerObstacleCollision, checkPaperHouseCollision,
  checkPaperWindowCollision, checkPaperTargetCollision,
  updateParticles, spawnParticles,
} from './physics';
import { generateHouses, getStreetLength, generateObstacle, generateTrainingCourse } from './street';

const HIGH_SCORE_KEY = 'paperboy_high_score';

export class GameEngine {
  // Subsystems
  private renderer!: Renderer;
  private input: InputManager;
  private sound: SoundManager;

  // State
  state: GameState;
  player!: Player;
  houses: House[] = [];
  obstacles: Obstacle[] = [];
  newspapers: Newspaper[] = [];
  particles: Particle[] = [];
  trainingTargets: TrainingTarget[] = [];

  // Frame tracking
  private animFrameId = 0;
  private frameCount = 0;
  private lastObstacleY = 0;
  private trainingStartY = 0;
  private streetEndReached = false;

  // Callbacks for Angular bindings
  onStateChange?: (state: GameState) => void;
  onDaySummary?: (houses: HouseSummary[]) => void;
  onGameOver?: () => void;

  constructor() {
    this.input = new InputManager();
    this.sound = new SoundManager();
    this.state = this.createInitialState();
  }

  /** Initialize with a canvas element. */
  init(canvas: HTMLCanvasElement): void {
    this.renderer = new Renderer(canvas);
  }

  /** Start a new game from scratch. */
  startGame(difficulty: Difficulty): void {
    this.state = this.createInitialState();
    this.state.difficulty = difficulty;
    const config = DIFFICULTY_SETTINGS[difficulty];
    this.state.lives = config.lives;
    this.state.papers = config.paperCount;
    this.state.phase = 'playing';
    this.state.highScore = this.loadHighScore();

    this.startDay();
    this.startLoop();
  }

  /** Begin a new day. */
  private startDay(): void {
    const config = DIFFICULTY_SETTINGS[this.state.difficulty];

    this.houses = generateHouses(this.state.day);
    this.state.streetLength = getStreetLength(this.houses);
    this.state.scrollY = 0;
    this.obstacles = [];
    this.newspapers = [];
    this.particles = [];
    this.lastObstacleY = 0;
    this.streetEndReached = false;

    // Training course at end of street
    this.trainingTargets = generateTrainingCourse(this.state.streetLength);
    this.trainingStartY = this.state.streetLength;

    // Reset player
    this.player = {
      x: (ROAD_LEFT + ROAD_RIGHT) / 2 - 10,
      y: CANVAS_HEIGHT - 120,
      vx: 0,
      vy: PLAYER_BASE_SPEED * config.speedMult,
      width: 20,
      height: 36,
      lane: 1,
      isCrashing: false,
      crashTimer: 0,
      invincibleTimer: 60, // Brief invincibility at start of day
      pedalPhase: 0,
      facing: 'up',
    };

    // Reset paper count for new day (add a few extras for later days)
    this.state.papers = config.paperCount + Math.floor(this.state.day * 0.5);

    this.emitState();
  }

  /** Advance to the next day. */
  nextDay(): void {
    this.state.day++;
    this.state.phase = 'playing';
    this.startDay();
    if (!this.animFrameId) {
      this.startLoop();
    }
  }

  /** Reset to title screen. */
  resetToTitle(): void {
    this.stopLoop();
    this.state.phase = 'title';
    this.emitState();
  }

  get gamepadConnected(): boolean {
    return this.input.gamepadConnected;
  }

  get highScore(): number {
    return this.loadHighScore();
  }

  // ─── Game Loop ────────────────────────────────────────────

  private startLoop(): void {
    if (this.animFrameId) return;
    const tick = () => {
      this.animFrameId = requestAnimationFrame(tick);
      this.update();
      this.render();
    };
    this.animFrameId = requestAnimationFrame(tick);
  }

  private stopLoop(): void {
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = 0;
    }
  }

  private update(): void {
    if (this.state.phase !== 'playing' && this.state.phase !== 'training') return;

    this.frameCount++;
    this.input.update();

    const config = DIFFICULTY_SETTINGS[this.state.difficulty];
    const daySpeedBonus = 1 + this.state.day * 0.08;
    const speedMult = config.speedMult * daySpeedBonus;

    // Update player
    updatePlayer(this.player, this.input.state, speedMult);

    // Scroll the world
    if (!this.player.isCrashing) {
      this.state.scrollY += this.player.vy;
    }

    // Throw newspaper
    if (this.input.state.throwPressed && this.state.papers > 0 && !this.player.isCrashing) {
      this.throwPaper();
    }

    // Generate obstacles as the world scrolls
    this.maybeSpawnObstacle(config, speedMult);

    // Update entities
    updateNewspapers(this.newspapers, this.player.vy);
    updateObstacles(this.obstacles, speedMult);
    updateParticles(this.particles);

    // Remove off-screen obstacles
    this.obstacles = this.obstacles.filter(o =>
      o.active && o.worldY > this.state.scrollY - 100 && o.worldY < this.state.scrollY + CANVAS_HEIGHT + 100
      && o.x > -100 && o.x < CANVAS_WIDTH + 100
    );

    // Collision: player vs obstacles
    const hitObs = checkPlayerObstacleCollision(this.player, this.getVisibleObstacles());
    if (hitObs) {
      this.crashPlayer();
      hitObs.active = false;
    }

    // Collision: newspapers vs houses
    for (const paper of this.newspapers) {
      if (!paper.active) continue;

      const mailboxHit = checkPaperHouseCollision(paper, this.getVisibleHouses());
      if (mailboxHit) {
        paper.active = false;
        this.onMailboxHit(mailboxHit);
        continue;
      }

      const windowHit = checkPaperWindowCollision(paper, this.getVisibleHouses());
      if (windowHit && !windowHit.windowBroken) {
        paper.active = false;
        this.onWindowHit(windowHit);
        continue;
      }

      // Training targets
      const targetHit = checkPaperTargetCollision(paper, this.trainingTargets);
      if (targetHit) {
        paper.active = false;
        targetHit.hit = true;
        this.state.score += targetHit.points;
        this.sound.playMailboxHit();
        spawnParticles(this.particles, paper.x, paper.worldY - this.state.scrollY, '#ffcc00', 8);
      }
    }

    // Check for missed subscriber houses (scrolled past)
    for (const h of this.houses) {
      if (h.isSubscriber && !h.delivered && !h.lost) {
        if (h.worldY + h.height < this.state.scrollY - 20) {
          h.lost = true; // Missed delivery → unsubscribe
        }
      }
    }

    // Check if day/training is complete
    const totalLength = this.trainingStartY + 800; // training course length
    if (this.state.scrollY >= totalLength) {
      this.endDay();
    }

    this.emitState();
  }

  private render(): void {
    this.renderer.clear();
    this.renderer.drawStreet(this.state.scrollY);

    // Draw houses
    for (const h of this.houses) {
      this.renderer.drawHouse(h, this.state.scrollY);
    }

    // Draw training header and targets
    this.renderer.drawTrainingHeader(this.state.scrollY, this.trainingStartY);
    for (const t of this.trainingTargets) {
      this.renderer.drawTrainingTarget(t, this.state.scrollY);
    }

    // Draw obstacles (sorted by Y for draw order)
    const visObs = this.getVisibleObstacles().sort((a, b) => a.worldY - b.worldY);
    for (const o of visObs) {
      this.renderer.drawObstacle(o, this.state.scrollY);
    }

    // Draw newspapers
    for (const p of this.newspapers) {
      this.renderer.drawNewspaper(p, this.state.scrollY);
    }

    // Draw player
    this.renderer.drawPlayer(this.player, this.frameCount);

    // Draw particles
    this.renderer.drawParticles(this.particles);

    // Draw subscriber map
    this.renderer.drawSubscriberMap(this.houses, this.state.scrollY, this.trainingStartY);
  }

  // ─── Actions ──────────────────────────────────────────────

  private throwPaper(): void {
    this.state.papers--;
    this.sound.playThrow();

    // Determine throw direction: toward nearest side
    const playerCenter = this.player.x + this.player.width / 2;
    const throwLeft = playerCenter < (ROAD_LEFT + ROAD_RIGHT) / 2;

    this.newspapers.push({
      x: this.player.x + this.player.width / 2 - 6,
      y: this.player.y,
      worldY: this.player.y + this.state.scrollY,
      vx: throwLeft ? -4 : 4,
      vy: 2,
      vz: 3.5,
      z: 10,
      active: true,
      rotation: 0,
      shadow: true,
    });
  }

  private crashPlayer(): void {
    this.player.isCrashing = true;
    this.player.crashTimer = CRASH_DURATION;
    this.state.lives--;
    this.sound.playCrash();

    spawnParticles(this.particles, this.player.x + this.player.width / 2, this.player.y + this.player.height / 2, '#ff4444', 15);
    spawnParticles(this.particles, this.player.x + this.player.width / 2, this.player.y + this.player.height / 2, '#ffcc00', 10);

    if (this.state.lives <= 0) {
      this.gameOver();
    }
  }

  private onMailboxHit(house: House): void {
    if (house.isSubscriber && !house.delivered) {
      house.delivered = true;
      this.state.score += 100;
      this.sound.playMailboxHit();
      spawnParticles(this.particles, house.mailboxX, house.mailboxY - this.state.scrollY, '#44ff44', 8);
    } else if (!house.isSubscriber) {
      // Bonus for damaging non-subscriber
      this.state.score += 25;
      this.sound.playObstacleHit();
      spawnParticles(this.particles, house.mailboxX, house.mailboxY - this.state.scrollY, '#ffcc00', 6);
    } else {
      // Already delivered
      this.state.score += 10;
      this.sound.playObstacleHit();
    }
  }

  private onWindowHit(house: House): void {
    house.windowBroken = true;
    this.sound.playWindowBreak();
    spawnParticles(this.particles, house.x + house.width / 2, house.worldY - this.state.scrollY + 15, '#aaddff', 12);

    if (house.isSubscriber) {
      house.lost = true;
      this.state.score -= 50;
    } else {
      this.state.score += 50; // Bonus for damaging non-subscriber
    }
  }

  private endDay(): void {
    this.state.phase = 'daySummary';
    this.sound.playDayComplete();

    // Calculate day bonus
    let deliveredCount = 0;
    let subscriberCount = 0;
    for (const h of this.houses) {
      if (h.isSubscriber) {
        subscriberCount++;
        if (h.delivered) deliveredCount++;
      }
    }

    // Perfect delivery bonus
    if (deliveredCount === subscriberCount && subscriberCount > 0) {
      this.state.score += 500;
    }

    // Training bonus
    let trainingHits = 0;
    for (const t of this.trainingTargets) {
      if (t.hit && t.type === 'target') trainingHits++;
    }
    this.state.score += trainingHits * 25;

    this.saveHighScore();
    this.emitState();

    if (this.onDaySummary) {
      this.onDaySummary(this.houses.map(h => ({
        name: h.name,
        isSubscriber: h.isSubscriber,
        lost: h.lost,
        delivered: h.delivered,
      })));
    }
  }

  private gameOver(): void {
    this.state.phase = 'gameOver';
    this.sound.playGameOver();
    this.saveHighScore();
    this.stopLoop();
    this.emitState();
    this.onGameOver?.();
  }

  // ─── Obstacle Spawning ───────────────────────────────────

  private maybeSpawnObstacle(config: { obstacleRate: number }, speedMult: number): void {
    const dayRate = config.obstacleRate * (1 + this.state.day * 0.15);
    const spawnAhead = this.state.scrollY + CANVAS_HEIGHT + 50;

    if (spawnAhead - this.lastObstacleY > 80 && Math.random() < dayRate * speedMult) {
      const obs = generateObstacle(spawnAhead, this.state.day, this.state.difficulty);
      this.obstacles.push(obs);
      this.lastObstacleY = spawnAhead;
    }
  }

  // ─── Helpers ──────────────────────────────────────────────

  private getVisibleHouses(): House[] {
    const top = this.state.scrollY - 60;
    const bot = this.state.scrollY + CANVAS_HEIGHT + 60;
    return this.houses.filter(h => h.worldY + h.height > top && h.worldY < bot);
  }

  private getVisibleObstacles(): Obstacle[] {
    const top = this.state.scrollY - 60;
    const bot = this.state.scrollY + CANVAS_HEIGHT + 60;
    return this.obstacles.filter(o =>
      o.active && o.worldY + o.height > top && o.worldY < bot
    );
  }

  private createInitialState(): GameState {
    return {
      phase: 'title',
      day: 1,
      score: 0,
      lives: 3,
      papers: 12,
      scrollY: 0,
      streetLength: 0,
      difficulty: 'normal',
      highScore: this.loadHighScore(),
    };
  }

  private emitState(): void {
    this.onStateChange?.(this.state);
  }

  // ─── Persistence ──────────────────────────────────────────

  private loadHighScore(): number {
    try {
      return parseInt(localStorage.getItem(HIGH_SCORE_KEY) ?? '0', 10) || 0;
    } catch {
      return 0;
    }
  }

  private saveHighScore(): void {
    try {
      const current = this.loadHighScore();
      if (this.state.score > current) {
        localStorage.setItem(HIGH_SCORE_KEY, String(this.state.score));
        this.state.highScore = this.state.score;
      }
    } catch {
      // localStorage not available — ignore
    }
  }

  /** Clean up resources. */
  destroy(): void {
    this.stopLoop();
    this.input.destroy();
    this.sound.destroy();
  }
}

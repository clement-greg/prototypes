/**
 * Paperboy Game – Type definitions and constants.
 */

// ─── Difficulty ───
export type Difficulty = 'easy' | 'normal' | 'hard';

export const DIFFICULTY_SETTINGS: Record<Difficulty, DifficultyConfig> = {
  easy:   { obstacleRate: 0.006, speedMult: 0.85, paperCount: 15, lives: 5 },
  normal: { obstacleRate: 0.010, speedMult: 1.0,  paperCount: 12, lives: 3 },
  hard:   { obstacleRate: 0.016, speedMult: 1.2,  paperCount: 10, lives: 2 },
};

export interface DifficultyConfig {
  obstacleRate: number;
  speedMult: number;
  paperCount: number;
  lives: number;
}

// ─── Game State ───
export type GamePhase = 'title' | 'playing' | 'daySummary' | 'gameOver' | 'training';

export interface GameState {
  phase: GamePhase;
  day: number;
  score: number;
  lives: number;
  papers: number;
  scrollY: number;           // How far down the street we've scrolled
  streetLength: number;      // Total length of current day's street
  difficulty: Difficulty;
  highScore: number;
}

// ─── Player ───
export interface Player {
  x: number;
  y: number;                 // Screen Y (stays roughly constant)
  vx: number;
  vy: number;                // Forward speed
  width: number;
  height: number;
  lane: number;              // 0‑based lane index
  isCrashing: boolean;
  crashTimer: number;
  invincibleTimer: number;
  pedalPhase: number;        // For simple pedal animation
  facing: 'up' | 'left' | 'right';
}

// ─── Houses ───
export interface House {
  id: number;
  x: number;                 // World X
  worldY: number;            // World Y position
  width: number;
  height: number;
  isSubscriber: boolean;
  delivered: boolean;
  windowBroken: boolean;
  lost: boolean;             // Unsubscribed this day
  side: 'left' | 'right';
  name: string;
  mailboxX: number;
  mailboxY: number;
  color: string;
  roofColor: string;
}

export interface HouseSummary {
  name: string;
  isSubscriber: boolean;
  lost: boolean;
  delivered: boolean;
}

// ─── Obstacles ───
export type ObstacleType = 'car' | 'dog' | 'skateboarder' | 'trashcan' | 'lawnmower' | 'cat' | 'puddle';

export interface Obstacle {
  x: number;
  worldY: number;
  width: number;
  height: number;
  type: ObstacleType;
  vx: number;
  vy: number;
  active: boolean;
  animPhase: number;
}

// ─── Newspaper ───
export interface Newspaper {
  x: number;
  y: number;
  worldY: number;
  vx: number;
  vy: number;
  vz: number;               // Vertical arc velocity
  z: number;                 // Height (for arc)
  active: boolean;
  rotation: number;
  shadow: boolean;
}

// ─── Particles ───
export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

// ─── Training Course ───
export interface TrainingTarget {
  x: number;
  worldY: number;
  width: number;
  height: number;
  hit: boolean;
  type: 'target' | 'ramp' | 'cone';
  points: number;
}

// ─── Input ───
export interface InputState {
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
  throw: boolean;
  throwPressed: boolean;    // Edge-triggered
  brake: boolean;
  accelerate: boolean;
}

// ─── Constants ───
export const CANVAS_WIDTH = 480;
export const CANVAS_HEIGHT = 720;
export const ROAD_LEFT = 100;
export const ROAD_RIGHT = 380;
export const ROAD_WIDTH = ROAD_RIGHT - ROAD_LEFT;
export const SIDEWALK_LEFT = 60;
export const SIDEWALK_RIGHT = 420;
export const PLAYER_BASE_SPEED = 2.5;
export const PLAYER_MAX_SPEED = 5;
export const PLAYER_STEER_SPEED = 3;
export const GRAVITY = 0.15;
export const THROW_VX = 4;
export const THROW_VZ = 3.5;
export const CRASH_DURATION = 60;        // frames
export const INVINCIBLE_DURATION = 90;   // frames
export const HOUSE_SPACING = 220;
export const HOUSE_COUNT_PER_SIDE = 10;

// Street names for houses
export const STREET_NAMES = [
  'The Johnsons', 'The Smiths', 'The Garcias', 'The Williamses',
  'The Browns', 'The Millers', 'The Davises', 'The Wilsons',
  'The Moores', 'The Taylors', 'The Andersons', 'The Thomases',
  'The Jacksons', 'The Whites', 'The Harrises', 'The Martins',
  'The Thompsons', 'The Robinsons', 'The Clarks', 'The Lewises'
];

export const HOUSE_COLORS = [
  '#c9b89e', '#a8c4d4', '#d4a8a8', '#a8d4b0', '#d4cfa8',
  '#b8a8d4', '#d4b8a8', '#a8d4d4', '#d4a8c4', '#c4d4a8'
];

export const ROOF_COLORS = [
  '#8b4513', '#6b3410', '#5a2d0c', '#7a3b11', '#694028',
  '#4a3728', '#8a5a3a', '#6e4530', '#5c3a2a', '#7c4e38'
];

export const OBSTACLE_COLORS: Record<ObstacleType, string> = {
  car: '#cc3333',
  dog: '#8b6914',
  skateboarder: '#3366cc',
  trashcan: '#666666',
  lawnmower: '#44aa44',
  cat: '#ff8800',
  puddle: '#4488cc',
};

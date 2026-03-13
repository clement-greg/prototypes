/**
 * Paperboy Game – Physics: player movement, newspaper arcs, collision detection.
 */
import {
  Player, Newspaper, Obstacle, House, InputState, Particle, TrainingTarget,
  PLAYER_BASE_SPEED, PLAYER_MAX_SPEED, PLAYER_STEER_SPEED,
  GRAVITY, THROW_VX, THROW_VZ,
  ROAD_LEFT, ROAD_RIGHT, SIDEWALK_LEFT, SIDEWALK_RIGHT,
  CRASH_DURATION, INVINCIBLE_DURATION, CANVAS_HEIGHT,
} from './types';

/** Update the player position based on input. */
export function updatePlayer(player: Player, input: InputState, speedMult: number): void {
  if (player.isCrashing) {
    player.crashTimer--;
    if (player.crashTimer <= 0) {
      player.isCrashing = false;
      player.invincibleTimer = INVINCIBLE_DURATION;
    }
    player.vy *= 0.95;
    return;
  }

  if (player.invincibleTimer > 0) {
    player.invincibleTimer--;
  }

  // Steering
  if (input.left) {
    player.vx = -PLAYER_STEER_SPEED;
    player.facing = 'left';
  } else if (input.right) {
    player.vx = PLAYER_STEER_SPEED;
    player.facing = 'right';
  } else {
    player.vx *= 0.85;
    player.facing = 'up';
  }

  // Speed control
  if (input.accelerate) {
    player.vy = Math.min(player.vy + 0.08 * speedMult, PLAYER_MAX_SPEED * speedMult);
  } else if (input.brake) {
    player.vy = Math.max(player.vy - 0.12 * speedMult, PLAYER_BASE_SPEED * 0.3 * speedMult);
  } else {
    // Ease toward base speed
    const target = PLAYER_BASE_SPEED * speedMult;
    player.vy += (target - player.vy) * 0.05;
  }

  // Apply horizontal movement
  player.x += player.vx;

  // Clamp to playable area (sidewalk to sidewalk)
  player.x = Math.max(SIDEWALK_LEFT, Math.min(SIDEWALK_RIGHT - player.width, player.x));

  // Pedal animation
  player.pedalPhase += player.vy * 0.15;
}

/** Update all active newspapers. */
export function updateNewspapers(papers: Newspaper[], scrollSpeed: number): void {
  for (const p of papers) {
    if (!p.active) continue;
    p.x += p.vx;
    p.worldY -= p.vy;
    p.z += p.vz;
    p.vz -= GRAVITY;
    p.rotation += 0.2;

    // Convert world Y to screen Y for rendering
    p.y = p.worldY;

    // Paper has landed or gone off-screen
    if (p.z <= 0) {
      p.z = 0;
      p.active = false;
    }
    if (p.x < -20 || p.x > 500 || p.worldY < -50) {
      p.active = false;
    }
  }
}

/** Update obstacle positions. */
export function updateObstacles(obstacles: Obstacle[], speedMult: number): void {
  for (const o of obstacles) {
    if (!o.active) continue;
    o.x += o.vx * speedMult;
    o.worldY += o.vy * speedMult;
    o.animPhase += 0.1;
  }
}

/** Check player-obstacle collisions. Returns true if a crash occurred. */
export function checkPlayerObstacleCollision(player: Player, obstacles: Obstacle[]): Obstacle | null {
  if (player.isCrashing || player.invincibleTimer > 0) return null;

  for (const o of obstacles) {
    if (!o.active) continue;
    if (rectsOverlap(
      player.x, player.y, player.width, player.height,
      o.x, o.worldY, o.width, o.height
    )) {
      return o;
    }
  }
  return null;
}

/** Check newspaper-house mailbox collisions. Returns the house hit, or null. */
export function checkPaperHouseCollision(paper: Newspaper, houses: House[]): House | null {
  if (!paper.active || paper.z > 15) return null; // Only check when paper is low

  for (const h of houses) {
    // Check mailbox area
    const mailboxW = 20;
    const mailboxH = 20;
    if (rectsOverlap(
      paper.x, paper.worldY, 12, 12,
      h.mailboxX, h.mailboxY, mailboxW, mailboxH
    )) {
      return h;
    }
  }
  return null;
}

/** Check newspaper-house window collision (for breaking windows). */
export function checkPaperWindowCollision(paper: Newspaper, houses: House[]): House | null {
  if (!paper.active) return null;

  for (const h of houses) {
    // Window area is in the middle of the house
    const winX = h.x + h.width * 0.25;
    const winY = h.worldY + h.height * 0.3;
    const winW = h.width * 0.5;
    const winH = h.height * 0.3;

    if (rectsOverlap(paper.x, paper.worldY, 12, 12, winX, winY, winW, winH)) {
      return h;
    }
  }
  return null;
}

/** Check newspaper-training target collision. */
export function checkPaperTargetCollision(paper: Newspaper, targets: TrainingTarget[]): TrainingTarget | null {
  if (!paper.active) return null;

  for (const t of targets) {
    if (t.hit) continue;
    if (rectsOverlap(paper.x, paper.worldY, 12, 12, t.x, t.worldY, t.width, t.height)) {
      return t;
    }
  }
  return null;
}

/** Update particles. */
export function updateParticles(particles: Particle[]): void {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.05; // mini gravity
    p.life--;
    if (p.life <= 0) {
      particles.splice(i, 1);
    }
  }
}

/** Spawn particles at a position. */
export function spawnParticles(particles: Particle[], x: number, y: number, color: string, count: number): void {
  for (let i = 0; i < count; i++) {
    particles.push({
      x, y,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4 - 2,
      life: 20 + Math.random() * 20,
      maxLife: 40,
      color,
      size: 2 + Math.random() * 3,
    });
  }
}

/** Simple AABB overlap test. */
function rectsOverlap(
  x1: number, y1: number, w1: number, h1: number,
  x2: number, y2: number, w2: number, h2: number
): boolean {
  return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
}

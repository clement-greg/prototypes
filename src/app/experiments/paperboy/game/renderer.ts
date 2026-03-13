/**
 * Paperboy Game – Canvas Renderer.
 * Draws all game entities with retro pixel-art style using basic canvas shapes.
 */
import {
  Player, House, Obstacle, Newspaper, Particle, TrainingTarget, GameState,
  CANVAS_WIDTH, CANVAS_HEIGHT, ROAD_LEFT, ROAD_RIGHT, SIDEWALK_LEFT, SIDEWALK_RIGHT,
  OBSTACLE_COLORS,
} from './types';

export class Renderer {
  private ctx: CanvasRenderingContext2D;

  constructor(private canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d')!;
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
  }

  clear(): void {
    this.ctx.fillStyle = '#4a7c3f'; // Grass green
    this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }

  /** Draw repeating road and sidewalks. */
  drawStreet(scrollY: number): void {
    const ctx = this.ctx;

    // Sidewalk left
    ctx.fillStyle = '#b8b098';
    ctx.fillRect(SIDEWALK_LEFT, 0, ROAD_LEFT - SIDEWALK_LEFT, CANVAS_HEIGHT);

    // Road
    ctx.fillStyle = '#555555';
    ctx.fillRect(ROAD_LEFT, 0, ROAD_RIGHT - ROAD_LEFT, CANVAS_HEIGHT);

    // Sidewalk right
    ctx.fillStyle = '#b8b098';
    ctx.fillRect(ROAD_RIGHT, 0, SIDEWALK_RIGHT - ROAD_RIGHT, CANVAS_HEIGHT);

    // Road lines (dashed center + edges)
    ctx.strokeStyle = '#ffcc00';
    ctx.lineWidth = 2;
    ctx.setLineDash([20, 20]);
    const roadCenter = (ROAD_LEFT + ROAD_RIGHT) / 2;
    const offset = scrollY % 40;
    ctx.beginPath();
    for (let y = -40 + offset; y < CANVAS_HEIGHT + 40; y += 40) {
      ctx.moveTo(roadCenter, y);
      ctx.lineTo(roadCenter, y + 20);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Road edge lines
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(ROAD_LEFT, 0);
    ctx.lineTo(ROAD_LEFT, CANVAS_HEIGHT);
    ctx.moveTo(ROAD_RIGHT, 0);
    ctx.lineTo(ROAD_RIGHT, CANVAS_HEIGHT);
    ctx.stroke();

    // Grass texture (simple dots)
    ctx.fillStyle = '#3b6b32';
    const grassSeed = Math.floor(scrollY / 5);
    for (let i = 0; i < 30; i++) {
      const gx = seededRandom(grassSeed + i * 13) * SIDEWALK_LEFT;
      const gy = (seededRandom(grassSeed + i * 7 + 1000) * CANVAS_HEIGHT + offset * 3) % CANVAS_HEIGHT;
      ctx.fillRect(gx, gy, 2, 2);
      // Right side grass
      const gx2 = SIDEWALK_RIGHT + seededRandom(grassSeed + i * 17) * (CANVAS_WIDTH - SIDEWALK_RIGHT);
      ctx.fillRect(gx2, gy, 2, 2);
    }
  }

  /** Draw a single house. */
  drawHouse(house: House, scrollY: number): void {
    const ctx = this.ctx;
    const screenY = house.worldY - scrollY;

    // Skip if off screen
    if (screenY < -house.height - 30 || screenY > CANVAS_HEIGHT + 30) return;

    const x = house.x;
    const y = screenY;
    const w = house.width;
    const h = house.height;

    // House body
    ctx.fillStyle = house.color;
    ctx.fillRect(x, y, w, h);

    // Outline
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(x, y, w, h);

    // Roof (triangle)
    ctx.fillStyle = house.roofColor;
    ctx.beginPath();
    ctx.moveTo(x - 5, y);
    ctx.lineTo(x + w / 2, y - 20);
    ctx.lineTo(x + w + 5, y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Door
    ctx.fillStyle = '#5c3a1e';
    const doorW = 12;
    const doorH = 20;
    ctx.fillRect(x + w / 2 - doorW / 2, y + h - doorH, doorW, doorH);

    // Windows
    if (!house.windowBroken) {
      ctx.fillStyle = '#aaddff';
      ctx.fillRect(x + 8, y + 10, 14, 12);
      ctx.fillRect(x + w - 22, y + 10, 14, 12);
      // Window frames
      ctx.strokeStyle = '#555';
      ctx.lineWidth = 1;
      ctx.strokeRect(x + 8, y + 10, 14, 12);
      ctx.strokeRect(x + w - 22, y + 10, 14, 12);
      // Cross panes
      ctx.beginPath();
      ctx.moveTo(x + 15, y + 10); ctx.lineTo(x + 15, y + 22);
      ctx.moveTo(x + 8, y + 16); ctx.lineTo(x + 22, y + 16);
      ctx.moveTo(x + w - 15, y + 10); ctx.lineTo(x + w - 15, y + 22);
      ctx.moveTo(x + w - 22, y + 16); ctx.lineTo(x + w - 8, y + 16);
      ctx.stroke();
    } else {
      // Broken windows
      ctx.fillStyle = '#333';
      ctx.fillRect(x + 8, y + 10, 14, 12);
      ctx.fillRect(x + w - 22, y + 10, 14, 12);
      // Crack lines
      ctx.strokeStyle = '#aaa';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x + 10, y + 12); ctx.lineTo(x + 20, y + 20);
      ctx.moveTo(x + 18, y + 12); ctx.lineTo(x + 10, y + 20);
      ctx.stroke();
    }

    // Subscriber indicator
    if (house.isSubscriber) {
      ctx.fillStyle = house.delivered ? '#44ff44' : '#ffcc00';
      ctx.font = 'bold 10px monospace';
      ctx.fillText(house.delivered ? '✓' : '★', x + w / 2 - 4, y - 24);
    }

    // Mailbox
    this.drawMailbox(house, scrollY);
  }

  /** Draw a mailbox next to a house. */
  private drawMailbox(house: House, scrollY: number): void {
    const ctx = this.ctx;
    const mx = house.mailboxX;
    const my = house.mailboxY - scrollY;

    if (my < -20 || my > CANVAS_HEIGHT + 20) return;

    // Post
    ctx.fillStyle = '#666';
    ctx.fillRect(mx + 6, my + 5, 3, 14);

    // Box
    ctx.fillStyle = house.delivered ? '#44cc44' : '#3377cc';
    ctx.fillRect(mx, my, 16, 12);
    ctx.strokeStyle = '#222';
    ctx.lineWidth = 1;
    ctx.strokeRect(mx, my, 16, 12);

    // Flag
    ctx.fillStyle = house.delivered ? '#44cc44' : '#cc3333';
    ctx.fillRect(mx + 14, my, 3, 6);
  }

  /** Draw the player's bicycle. */
  drawPlayer(player: Player, frameCount: number): void {
    const ctx = this.ctx;
    const { x, y, width: w, height: h, isCrashing, invincibleTimer, pedalPhase, facing } = player;

    // Flash when invincible
    if (invincibleTimer > 0 && Math.floor(frameCount / 4) % 2 === 0) return;

    ctx.save();

    if (isCrashing) {
      // Tumble animation
      ctx.translate(x + w / 2, y + h / 2);
      ctx.rotate(player.crashTimer * 0.15);
      ctx.translate(-(x + w / 2), -(y + h / 2));
    }

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.beginPath();
    ctx.ellipse(x + w / 2, y + h + 2, w / 2, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Body (torso)
    ctx.fillStyle = '#2266cc'; // Blue shirt
    ctx.fillRect(x + w / 2 - 5, y + 8, 10, 14);

    // Head
    ctx.fillStyle = '#ffcc99';
    ctx.beginPath();
    ctx.arc(x + w / 2, y + 6, 6, 0, Math.PI * 2);
    ctx.fill();

    // Hat/cap
    ctx.fillStyle = '#cc3333';
    ctx.fillRect(x + w / 2 - 7, y, 14, 5);
    ctx.fillRect(x + w / 2 - 5, y - 2, 10, 4);

    // Newspaper bag
    ctx.fillStyle = '#8b6914';
    ctx.fillRect(x + w / 2 + 3, y + 10, 6, 8);

    // Legs (pedaling)
    const legPhase = Math.sin(pedalPhase);
    ctx.fillStyle = '#334466';
    ctx.fillRect(x + w / 2 - 4, y + 22, 4, 8 + legPhase * 3);
    ctx.fillRect(x + w / 2, y + 22, 4, 8 - legPhase * 3);

    // Bicycle frame
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 2;
    // Top tube
    ctx.beginPath();
    ctx.moveTo(x + w / 2, y + 20);
    ctx.lineTo(x + w / 2, y + h - 4);
    ctx.stroke();

    // Wheels
    const wheelR = 6;
    ctx.strokeStyle = '#555';
    ctx.lineWidth = 1.5;
    // Front wheel
    ctx.beginPath();
    ctx.arc(x + w / 2, y + h - 2, wheelR, 0, Math.PI * 2);
    ctx.stroke();
    // Rear wheel
    ctx.beginPath();
    ctx.arc(x + w / 2, y + h + 8, wheelR, 0, Math.PI * 2);
    ctx.stroke();

    // Spokes animation
    const spokeAngle = pedalPhase * 2;
    ctx.strokeStyle = '#777';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < 4; i++) {
      const a = spokeAngle + i * Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(x + w / 2, y + h - 2);
      ctx.lineTo(x + w / 2 + Math.cos(a) * wheelR, y + h - 2 + Math.sin(a) * wheelR);
      ctx.stroke();
    }

    // Handlebars
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 2;
    ctx.beginPath();
    const hbOffX = facing === 'left' ? -4 : facing === 'right' ? 4 : 0;
    ctx.moveTo(x + w / 2 - 6 + hbOffX, y + 18);
    ctx.lineTo(x + w / 2 + 6 + hbOffX, y + 18);
    ctx.stroke();

    ctx.restore();
  }

  /** Draw a thrown newspaper. */
  drawNewspaper(paper: Newspaper, scrollY: number): void {
    const ctx = this.ctx;
    if (!paper.active) return;

    const screenY = paper.worldY - scrollY;
    if (screenY < -20 || screenY > CANVAS_HEIGHT + 20) return;

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    ctx.beginPath();
    ctx.ellipse(paper.x + 6, screenY + 2, 6, 3, 0, 0, Math.PI * 2);
    ctx.fill();

    // Paper (offset by z-height for arc)
    ctx.save();
    ctx.translate(paper.x + 6, screenY - paper.z);
    ctx.rotate(paper.rotation);
    ctx.fillStyle = '#f5f5dc';
    ctx.fillRect(-6, -4, 12, 8);
    // Fold line
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(0, -4);
    ctx.lineTo(0, 4);
    ctx.stroke();
    // Text lines
    ctx.fillStyle = '#999';
    ctx.fillRect(-4, -2, 8, 1);
    ctx.fillRect(-4, 0, 6, 1);
    ctx.fillRect(-4, 2, 7, 1);
    ctx.restore();
  }

  /** Draw an obstacle. */
  drawObstacle(obs: Obstacle, scrollY: number): void {
    const ctx = this.ctx;
    if (!obs.active) return;

    const screenY = obs.worldY - scrollY;
    if (screenY < -50 || screenY > CANVAS_HEIGHT + 50) return;

    const { x, width: w, height: h, type, animPhase } = obs;
    const color = OBSTACLE_COLORS[type];

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    ctx.beginPath();
    ctx.ellipse(x + w / 2, screenY + h + 2, w / 2, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    switch (type) {
      case 'car':
        this.drawCar(x, screenY, w, h, color, obs.vx);
        break;
      case 'dog':
        this.drawDog(x, screenY, w, h, animPhase);
        break;
      case 'skateboarder':
        this.drawSkateboarder(x, screenY, w, h, animPhase);
        break;
      case 'trashcan':
        this.drawTrashCan(x, screenY, w, h);
        break;
      case 'lawnmower':
        this.drawLawnmower(x, screenY, w, h, animPhase);
        break;
      case 'cat':
        this.drawCat(x, screenY, w, h, animPhase);
        break;
      case 'puddle':
        this.drawPuddle(x, screenY, w, h);
        break;
    }
  }

  private drawCar(x: number, y: number, w: number, h: number, color: string, vx: number): void {
    const ctx = this.ctx;
    ctx.fillStyle = color;
    ctx.fillRect(x + 3, y, w - 6, h);
    ctx.fillRect(x, y + 8, w, h - 16);
    // Windshield
    ctx.fillStyle = '#88bbee';
    ctx.fillRect(x + 6, y + 4, w - 12, 8);
    // Wheels
    ctx.fillStyle = '#222';
    ctx.fillRect(x - 1, y + 6, 4, 8);
    ctx.fillRect(x + w - 3, y + 6, 4, 8);
    ctx.fillRect(x - 1, y + h - 14, 4, 8);
    ctx.fillRect(x + w - 3, y + h - 14, 4, 8);
    // Headlights
    ctx.fillStyle = '#ffff88';
    ctx.fillRect(x + 4, y, 5, 3);
    ctx.fillRect(x + w - 9, y, 5, 3);
  }

  private drawDog(x: number, y: number, w: number, h: number, phase: number): void {
    const ctx = this.ctx;
    // Body
    ctx.fillStyle = '#8b6914';
    ctx.fillRect(x + 2, y + 4, w - 4, h - 6);
    // Head
    ctx.fillRect(x + w - 6, y, 8, 8);
    // Ears
    ctx.fillStyle = '#6b4914';
    ctx.fillRect(x + w - 4, y - 3, 3, 4);
    ctx.fillRect(x + w + 1, y - 3, 3, 4);
    // Legs (animated)
    ctx.fillStyle = '#8b6914';
    const legOff = Math.sin(phase * 3) * 2;
    ctx.fillRect(x + 3, y + h - 4 + legOff, 3, 5);
    ctx.fillRect(x + w - 6, y + h - 4 - legOff, 3, 5);
    // Tail
    ctx.strokeStyle = '#8b6914';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y + 5);
    ctx.quadraticCurveTo(x - 4, y + Math.sin(phase * 5) * 3, x - 2, y);
    ctx.stroke();
    // Eye
    ctx.fillStyle = '#000';
    ctx.fillRect(x + w, y + 2, 2, 2);
  }

  private drawSkateboarder(x: number, y: number, w: number, h: number, phase: number): void {
    const ctx = this.ctx;
    // Board
    ctx.fillStyle = '#cc8833';
    ctx.fillRect(x - 2, y + h - 3, w + 4, 4);
    // Wheels
    ctx.fillStyle = '#444';
    ctx.beginPath();
    ctx.arc(x + 2, y + h + 2, 2, 0, Math.PI * 2);
    ctx.arc(x + w - 2, y + h + 2, 2, 0, Math.PI * 2);
    ctx.fill();
    // Body
    ctx.fillStyle = '#3366cc';
    ctx.fillRect(x + 3, y + 10, w - 6, h - 13);
    // Head
    ctx.fillStyle = '#ffcc99';
    ctx.beginPath();
    ctx.arc(x + w / 2, y + 6, 5, 0, Math.PI * 2);
    ctx.fill();
    // Hair
    ctx.fillStyle = '#333';
    ctx.fillRect(x + w / 2 - 5, y, 10, 4);
    // Arms (wobble)
    ctx.strokeStyle = '#ffcc99';
    ctx.lineWidth = 2;
    const armOff = Math.sin(phase * 4) * 3;
    ctx.beginPath();
    ctx.moveTo(x + 3, y + 14);
    ctx.lineTo(x - 2, y + 14 + armOff);
    ctx.moveTo(x + w - 3, y + 14);
    ctx.lineTo(x + w + 2, y + 14 - armOff);
    ctx.stroke();
  }

  private drawTrashCan(x: number, y: number, w: number, h: number): void {
    const ctx = this.ctx;
    ctx.fillStyle = '#666';
    ctx.fillRect(x + 2, y + 3, w - 4, h - 3);
    // Lid
    ctx.fillStyle = '#777';
    ctx.fillRect(x, y, w, 5);
    // Handle
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(x + w / 2, y, 5, Math.PI, 0);
    ctx.stroke();
    // Lines
    ctx.strokeStyle = '#555';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x + 4, y + 10); ctx.lineTo(x + w - 4, y + 10);
    ctx.moveTo(x + 4, y + 16); ctx.lineTo(x + w - 4, y + 16);
    ctx.stroke();
  }

  private drawLawnmower(x: number, y: number, w: number, h: number, phase: number): void {
    const ctx = this.ctx;
    // Body
    ctx.fillStyle = '#44aa44';
    ctx.fillRect(x, y + 4, w, h - 4);
    // Engine
    ctx.fillStyle = '#333';
    ctx.fillRect(x + 4, y, w - 8, 6);
    // Wheels
    ctx.fillStyle = '#222';
    ctx.beginPath();
    ctx.arc(x + 3, y + h, 3, 0, Math.PI * 2);
    ctx.arc(x + w - 3, y + h, 3, 0, Math.PI * 2);
    ctx.fill();
    // Handle
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x + w / 2, y + 4);
    ctx.lineTo(x + w / 2, y - 8);
    ctx.stroke();
    // Vibration effect
    if (Math.floor(phase * 10) % 2 === 0) {
      ctx.fillStyle = 'rgba(100,200,100,0.3)';
      ctx.fillRect(x - 2, y + h - 2, w + 4, 4);
    }
  }

  private drawCat(x: number, y: number, w: number, h: number, phase: number): void {
    const ctx = this.ctx;
    // Body
    ctx.fillStyle = '#ff8800';
    ctx.fillRect(x + 2, y + 4, w - 4, h - 4);
    // Head
    ctx.fillRect(x, y, w - 2, 7);
    // Ears
    ctx.beginPath();
    ctx.moveTo(x, y); ctx.lineTo(x + 3, y - 4); ctx.lineTo(x + 6, y);
    ctx.moveTo(x + w - 8, y); ctx.lineTo(x + w - 5, y - 4); ctx.lineTo(x + w - 2, y);
    ctx.fill();
    // Eyes
    ctx.fillStyle = '#0a0';
    ctx.fillRect(x + 3, y + 2, 2, 2);
    ctx.fillRect(x + w - 7, y + 2, 2, 2);
    // Tail
    ctx.strokeStyle = '#ff8800';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x + 2, y + h / 2);
    ctx.quadraticCurveTo(x - 8, y + h / 2 + Math.sin(phase * 4) * 5, x - 4, y + 2);
    ctx.stroke();
  }

  private drawPuddle(x: number, y: number, w: number, h: number): void {
    const ctx = this.ctx;
    ctx.fillStyle = 'rgba(68,136,204,0.5)';
    ctx.beginPath();
    ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    // Highlights
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.beginPath();
    ctx.ellipse(x + w / 3, y + h / 3, 4, 2, -0.3, 0, Math.PI * 2);
    ctx.fill();
  }

  /** Draw training course targets. */
  drawTrainingTarget(target: TrainingTarget, scrollY: number): void {
    const ctx = this.ctx;
    const screenY = target.worldY - scrollY;
    if (screenY < -40 || screenY > CANVAS_HEIGHT + 40) return;

    if (target.type === 'target') {
      if (target.hit) {
        ctx.globalAlpha = 0.3;
      }
      // Bullseye
      ctx.fillStyle = '#ff3333';
      ctx.beginPath();
      ctx.arc(target.x + target.width / 2, screenY + target.height / 2, target.width / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(target.x + target.width / 2, screenY + target.height / 2, target.width / 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ff3333';
      ctx.beginPath();
      ctx.arc(target.x + target.width / 2, screenY + target.height / 2, target.width / 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    } else if (target.type === 'cone') {
      // Orange cone
      ctx.fillStyle = '#ff6600';
      ctx.beginPath();
      ctx.moveTo(target.x, screenY + target.height);
      ctx.lineTo(target.x + target.width / 2, screenY);
      ctx.lineTo(target.x + target.width, screenY + target.height);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(target.x + 3, screenY + target.height * 0.6);
      ctx.lineTo(target.x + target.width - 3, screenY + target.height * 0.6);
      ctx.stroke();
    }
  }

  /** Draw particles. */
  drawParticles(particles: Particle[]): void {
    const ctx = this.ctx;
    for (const p of particles) {
      ctx.globalAlpha = p.life / p.maxLife;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.size, p.size);
    }
    ctx.globalAlpha = 1;
  }

  /** Draw the subscriber map on the side of the screen. */
  drawSubscriberMap(houses: House[], scrollY: number, streetLength: number): void {
    const ctx = this.ctx;
    const mapX = CANVAS_WIDTH - 30;
    const mapY = 60;
    const mapH = CANVAS_HEIGHT - 120;

    // Map background
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.fillRect(mapX - 2, mapY - 2, 26, mapH + 4);

    // Map road
    ctx.fillStyle = '#555';
    ctx.fillRect(mapX + 5, mapY, 12, mapH);

    for (const h of houses) {
      const relY = h.worldY / streetLength;
      const dotY = mapY + relY * mapH;
      const dotX = h.side === 'left' ? mapX + 2 : mapX + 16;

      if (h.isSubscriber) {
        ctx.fillStyle = h.delivered ? '#44ff44' : h.lost ? '#ff4444' : '#ffcc00';
      } else {
        ctx.fillStyle = '#666';
      }
      ctx.fillRect(dotX, dotY, 5, 3);
    }

    // Player position indicator
    const playerRel = scrollY / streetLength;
    const playerMapY = mapY + playerRel * mapH;
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.moveTo(mapX, playerMapY);
    ctx.lineTo(mapX + 4, playerMapY - 3);
    ctx.lineTo(mapX + 4, playerMapY + 3);
    ctx.closePath();
    ctx.fill();
  }

  /** Draw the training course header. */
  drawTrainingHeader(scrollY: number, streetEnd: number): void {
    const ctx = this.ctx;
    const headerY = streetEnd - scrollY - 40;

    if (headerY > -40 && headerY < CANVAS_HEIGHT) {
      ctx.fillStyle = '#ffcc00';
      ctx.font = 'bold 20px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('TRAINING COURSE', CANVAS_WIDTH / 2, headerY);
      ctx.fillStyle = '#fff';
      ctx.font = '12px monospace';
      ctx.fillText('Hit targets for bonus points!', CANVAS_WIDTH / 2, headerY + 20);
      ctx.textAlign = 'left';
    }
  }
}

/** Simple seeded pseudorandom for deterministic grass/decoration placement. */
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * Paperboy Game – Street & level generation.
 * Creates houses, obstacles, and training-course targets for each day.
 */
import {
  House, Obstacle, ObstacleType, TrainingTarget, Difficulty,
  HOUSE_SPACING, HOUSE_COUNT_PER_SIDE, CANVAS_WIDTH,
  ROAD_LEFT, ROAD_RIGHT, STREET_NAMES, HOUSE_COLORS, ROOF_COLORS,
  DIFFICULTY_SETTINGS,
} from './types';

const OBSTACLE_TYPES: ObstacleType[] = ['car', 'dog', 'skateboarder', 'trashcan', 'lawnmower', 'cat', 'puddle'];

/** Generate a set of houses for a day. */
export function generateHouses(day: number): House[] {
  const houses: House[] = [];
  const count = HOUSE_COUNT_PER_SIDE;
  const subscriberChance = Math.max(0.35, 0.7 - day * 0.03);

  for (let side = 0; side < 2; side++) {
    for (let i = 0; i < count; i++) {
      const isLeft = side === 0;
      const houseW = 70;
      const houseH = 55;
      const x = isLeft ? 5 : CANVAS_WIDTH - houseW - 5;
      const worldY = 200 + i * HOUSE_SPACING;

      const nameIdx = (side * count + i) % STREET_NAMES.length;
      const colorIdx = (side * count + i + day) % HOUSE_COLORS.length;

      const mailboxX = isLeft ? x + houseW + 8 : x - 24;
      const mailboxY = worldY + houseH - 15;

      houses.push({
        id: side * count + i,
        x,
        worldY,
        width: houseW,
        height: houseH,
        isSubscriber: Math.random() < subscriberChance,
        delivered: false,
        windowBroken: false,
        lost: false,
        side: isLeft ? 'left' : 'right',
        name: STREET_NAMES[nameIdx],
        mailboxX,
        mailboxY,
        color: HOUSE_COLORS[colorIdx],
        roofColor: ROOF_COLORS[colorIdx],
      });
    }
  }
  return houses;
}

/** Calculate total street length for a day. */
export function getStreetLength(houses: House[]): number {
  let maxY = 0;
  for (const h of houses) {
    maxY = Math.max(maxY, h.worldY + h.height);
  }
  return maxY + 400; // Extra space at the end
}

/** Generate obstacles for a given scroll range. */
export function generateObstacle(worldY: number, day: number, difficulty: Difficulty): Obstacle {
  const type = OBSTACLE_TYPES[Math.floor(Math.random() * OBSTACLE_TYPES.length)];
  const roadMid = (ROAD_LEFT + ROAD_RIGHT) / 2;

  let x: number;
  let vx = 0;
  let vy = 0;
  let w = 24;
  let h = 24;

  switch (type) {
    case 'car':
      w = 30; h = 50;
      // Car crosses horizontally
      const fromLeft = Math.random() > 0.5;
      x = fromLeft ? ROAD_LEFT - 60 : ROAD_RIGHT + 30;
      vx = fromLeft ? (1.5 + day * 0.15) : -(1.5 + day * 0.15);
      break;
    case 'dog':
      w = 22; h = 18;
      x = ROAD_LEFT + Math.random() * (ROAD_RIGHT - ROAD_LEFT - w);
      vx = (Math.random() - 0.5) * 2;
      vy = (Math.random() - 0.5) * 0.5;
      break;
    case 'skateboarder':
      w = 18; h = 28;
      x = ROAD_LEFT + Math.random() * (ROAD_RIGHT - ROAD_LEFT - w);
      vy = -0.5 - Math.random();
      break;
    case 'trashcan':
      w = 20; h = 24;
      x = ROAD_LEFT + 10 + Math.random() * (ROAD_RIGHT - ROAD_LEFT - 40);
      break;
    case 'lawnmower':
      w = 20; h = 24;
      x = Math.random() > 0.5 ? 65 + Math.random() * 30 : ROAD_RIGHT + 5 + Math.random() * 20;
      vx = (Math.random() - 0.5) * 0.8;
      break;
    case 'cat':
      w = 16; h = 14;
      x = ROAD_LEFT + Math.random() * (ROAD_RIGHT - ROAD_LEFT - w);
      vx = (Math.random() - 0.5) * 3;
      vy = (Math.random() - 0.5) * 1;
      break;
    case 'puddle':
      w = 35; h = 15;
      x = ROAD_LEFT + 15 + Math.random() * (ROAD_RIGHT - ROAD_LEFT - 60);
      break;
    default:
      x = roadMid;
  }

  return {
    x, worldY, width: w, height: h,
    type, vx, vy, active: true, animPhase: 0,
  };
}

/** Generate training course targets (at end of street). */
export function generateTrainingCourse(streetEnd: number): TrainingTarget[] {
  const targets: TrainingTarget[] = [];
  const startY = streetEnd + 100;

  // Targets along the road
  for (let i = 0; i < 8; i++) {
    targets.push({
      x: ROAD_LEFT + 30 + Math.random() * (ROAD_RIGHT - ROAD_LEFT - 80),
      worldY: startY + i * 80,
      width: 30,
      height: 30,
      hit: false,
      type: 'target',
      points: 50,
    });
  }

  // Cones to dodge
  for (let i = 0; i < 5; i++) {
    targets.push({
      x: ROAD_LEFT + 20 + Math.random() * (ROAD_RIGHT - ROAD_LEFT - 60),
      worldY: startY + 40 + i * 130,
      width: 16,
      height: 16,
      hit: false,
      type: 'cone',
      points: 0,
    });
  }

  return targets;
}

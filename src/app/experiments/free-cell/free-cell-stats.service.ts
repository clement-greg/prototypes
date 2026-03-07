import { Injectable } from '@angular/core';

export interface GameRecord {
  id?: number;
  startedAt: Date;
  completedAt: Date | null;
  moves: number;
  durationSeconds: number;
  result: 'win' | 'loss' | 'in-progress';
}

const DB_NAME = 'FreeCellStats';
const DB_VERSION = 1;
const STORE_NAME = 'games';

@Injectable({ providedIn: 'root' })
export class FreeCellStatsService {
  private dbPromise: Promise<IDBDatabase>;

  constructor() {
    this.dbPromise = this.openDb();
  }

  private openDb(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
          store.createIndex('result', 'result', { unique: false });
          store.createIndex('startedAt', 'startedAt', { unique: false });
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  /** Start a new game and return its record id */
  async startGame(): Promise<number> {
    const db = await this.dbPromise;
    const record: GameRecord = {
      startedAt: new Date(),
      completedAt: null,
      moves: 0,
      durationSeconds: 0,
      result: 'in-progress',
    };
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.add(record);
      req.onsuccess = () => resolve(req.result as number);
      req.onerror = () => reject(req.error);
    });
  }

  /** Mark a game as won */
  async recordWin(id: number, moves: number, durationSeconds: number): Promise<void> {
    await this.updateGame(id, { result: 'win', moves, durationSeconds, completedAt: new Date() });
  }

  /** Mark a game as lost (abandoned / new game started) */
  async recordLoss(id: number, moves: number, durationSeconds: number): Promise<void> {
    await this.updateGame(id, { result: 'loss', moves, durationSeconds, completedAt: new Date() });
  }

  private async updateGame(id: number, changes: Partial<GameRecord>): Promise<void> {
    const db = await this.dbPromise;
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const getReq = store.get(id);
      getReq.onsuccess = () => {
        const record = getReq.result as GameRecord;
        if (!record) { resolve(); return; }
        Object.assign(record, changes);
        const putReq = store.put(record);
        putReq.onsuccess = () => resolve();
        putReq.onerror = () => reject(putReq.error);
      };
      getReq.onerror = () => reject(getReq.error);
    });
  }

  /** Retrieve all game records */
  async getAllGames(): Promise<GameRecord[]> {
    const db = await this.dbPromise;
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result as GameRecord[]);
      req.onerror = () => reject(req.error);
    });
  }

  /** Delete a single game record */
  async deleteGame(id: number): Promise<void> {
    const db = await this.dbPromise;
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(id);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  /** Clear all records */
  async clearAll(): Promise<void> {
    const db = await this.dbPromise;
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.clear();
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  /** Seed database with dummy data for visualization testing */
  async seedDummyData(): Promise<void> {
    const existing = await this.getAllGames();
    if (existing.length > 0) return; // Don't re-seed

    const dummyGames: GameRecord[] = [];
    const now = new Date();

    // Generate 60 games spread over the past 90 days
    for (let i = 0; i < 60; i++) {
      const daysAgo = Math.floor(Math.random() * 90);
      const startDate = new Date(now.getTime() - daysAgo * 86400000);
      startDate.setHours(Math.floor(Math.random() * 14) + 8); // 8am - 10pm
      startDate.setMinutes(Math.floor(Math.random() * 60));

      const won = Math.random() < 0.45; // ~45% win rate
      const moves = won
        ? Math.floor(Math.random() * 80) + 45   // wins: 45-124 moves
        : Math.floor(Math.random() * 60) + 10;  // losses: 10-69 moves
      const duration = won
        ? Math.floor(Math.random() * 600) + 120  // wins: 2-12 min
        : Math.floor(Math.random() * 300) + 30;  // losses: 0.5-5.5 min

      const completedAt = new Date(startDate.getTime() + duration * 1000);

      dummyGames.push({
        startedAt: startDate,
        completedAt,
        moves,
        durationSeconds: duration,
        result: won ? 'win' : 'loss',
      });
    }

    // Sort by start date so IDs are sequential
    dummyGames.sort((a, b) => a.startedAt.getTime() - b.startedAt.getTime());

    const db = await this.dbPromise;
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      for (const game of dummyGames) {
        store.add(game);
      }
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }
}

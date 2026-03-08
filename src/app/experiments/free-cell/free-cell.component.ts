import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LottiePlayerComponent } from '../../dependencies/lottie-player/lottie-player.component';
import { FreeCellStatsService } from './free-cell-stats.service';
import { FreeCellStatsComponent } from './free-cell-stats.component';

interface Card {
  suit: string;
  rank: string;
  color: string;
}

interface SelectedCard {
  source: string;
  sourceIndex: number;
  cardIndex: number;
}

interface DragState {
  source: string;
  sourceIndex: number;
  cardIndex: number;
  offsetX: number;
  offsetY: number;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  moved: boolean;
}

interface GameHistoryState {
  tableau: Card[][];
  freeCells: (Card | null)[];
  foundations: Card[][];
  moveCount: number;
}

@Component({
  selector: 'app-free-cell',
  imports: [FormsModule, LottiePlayerComponent, FreeCellStatsComponent],
  templateUrl: './free-cell.component.html',
  styleUrl: './free-cell.component.scss',
})
export class FreeCellComponent implements OnInit, OnDestroy {
  @ViewChild('statsPopup') statsPopup!: FreeCellStatsComponent;

  private static readonly SAVE_KEY = 'freecell_game_state';

  private static readonly SETTINGS_KEY = 'freecell_settings';

  readonly CARD_OVERLAP = 34;
  readonly foundationLabels = ['♠', '♥', '♦', '♣'];

  private readonly SUITS = ['spades', 'hearts', 'diamonds', 'clubs'];
  private readonly SUIT_COLORS: Record<string, string> = {
    spades: 'black', hearts: 'red', diamonds: 'red', clubs: 'black'
  };
  readonly FOUNDATION_SUIT_ORDER = ['spades', 'hearts', 'diamonds', 'clubs'];
  private readonly RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  private readonly RANK_VALUES: Record<string, number> = {
    'A': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7,
    '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13
  };
  private readonly RANK_NAMES: Record<string, string> = {
    'A': 'ace', '2': '2', '3': '3', '4': '4', '5': '5',
    '6': '6', '7': '7', '8': '8', '9': '9', '10': '10',
    'J': 'jack', 'Q': 'queen', 'K': 'king'
  };

  // Game state
  tableau: Card[][] = [[], [], [], [], [], [], [], []];
  freeCells: (Card | null)[] = [null, null, null, null];
  foundations: Card[][] = [[], [], [], []];
  moveCount = 0;
  timerSeconds = 0;
  gameWon = false;
  winStatsText = '';
  showSettings = false;
  soundEnabled = true;
  volume = 75; // 0–100
  selectedCard: SelectedCard | null = null;
  dragState: DragState | null = null;
  highlightedTarget: { type: string; index: number } | null = null;
  dealing = false;

  constructor(private el: ElementRef<HTMLElement>) {
    this.loadSettings();
  }

  private timerInterval: ReturnType<typeof setInterval> | null = null;
  private history: GameHistoryState[] = [];
  private lastClickInfo: { source: string; sourceIndex: number; cardIndex: number } | null = null;
  private lastClickTime = 0;

  private boundOnMouseMove = this.onDocMouseMove.bind(this);
  private boundOnMouseUp = this.onDocMouseUp.bind(this);
  private boundOnTouchMove = this.onDocTouchMove.bind(this);
  private boundOnTouchEnd = this.onDocTouchEnd.bind(this);

  private stats = inject(FreeCellStatsService);
  private currentGameId: number | null = null;

  ngOnInit() {
    this.stats.seedDummyData();
    if (!this.restoreGameState()) {
      this.newGame();
    }
  }

  ngOnDestroy() {
    this.clearTimer();
    this.removeDragListeners();
  }

  get timerDisplay(): string {
    const m = Math.floor(this.timerSeconds / 60);
    const s = this.timerSeconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  // ── Deck & Shuffle ──

  private createDeck(): Card[] {
    const deck: Card[] = [];
    for (const suit of this.SUITS) {
      for (const rank of this.RANKS) {
        deck.push({ suit, rank, color: this.SUIT_COLORS[suit] });
      }
    }
    return deck;
  }

  private shuffle(arr: Card[]): Card[] {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // ── Init / New Game ──

  async newGame() {
    // Record previous in-progress game as a loss
    if (this.currentGameId != null && !this.gameWon && this.moveCount > 0) {
      await this.stats.recordLoss(this.currentGameId, this.moveCount, this.timerSeconds);
    }

    this.gameWon = false;
    this.clearTimer();
    this.timerSeconds = 0;
    this.moveCount = 0;
    this.history = [];
    this.selectedCard = null;
    this.dragState = null;
    this.highlightedTarget = null;

    this.tableau = [[], [], [], [], [], [], [], []];
    this.freeCells = [null, null, null, null];
    this.foundations = [[], [], [], []];

    const deck = this.shuffle(this.createDeck());
    for (let i = 0; i < 52; i++) {
      this.tableau[i % 8].push(deck[i]);
    }

    // Trigger dealing animation
    this.dealing = true;
    setTimeout(() => { this.dealing = false; }, 1200);

    this.currentGameId = await this.stats.startGame();
    this.startTimer();
    this.persistGameState();
  }

  onNewGame() {
    if (this.moveCount > 0 && !this.gameWon) {
      if (!confirm('Start a new game? Current progress will be lost.')) return;
    }
    this.newGame();
  }

  // ── Timer ──

  private startTimer() {
    this.clearTimer();
    this.timerInterval = setInterval(() => {
      this.timerSeconds++;
    }, 1000);
  }

  private clearTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  // ── Card Image Path ──

  getCardImagePath(card: Card): string {
    const rankName = this.RANK_NAMES[card.rank];
    const isRoyal = ['J', 'Q', 'K'].includes(card.rank);
    const suffix = isRoyal ? '2' : '';
    return `assets/images/free-cell/${rankName}_of_${card.suit}${suffix}.svg`;
  }

  // ── Template Helpers ──

  getDealDelay(colIndex: number, rowIndex: number): string {
    // Cards are dealt round-robin: row 0 col 0, row 0 col 1, ... row 0 col 7, row 1 col 0, ...
    const dealOrder = rowIndex * 8 + colIndex;
    return `${dealOrder * 18}ms`;
  }

  isTableauCardSelected(colIndex: number, rowIndex: number): boolean {
    return !!this.selectedCard &&
      this.selectedCard.source === 'tableau' &&
      this.selectedCard.sourceIndex === colIndex &&
      rowIndex >= this.selectedCard.cardIndex;
  }

  isFreeCellSelected(index: number): boolean {
    return !!this.selectedCard &&
      this.selectedCard.source === 'freecell' &&
      this.selectedCard.sourceIndex === index;
  }

  isDragging(source: string, sourceIndex: number, cardIndex: number): boolean {
    if (!this.dragState || !this.dragState.moved) return false;
    if (this.dragState.source !== source || this.dragState.sourceIndex !== sourceIndex) return false;
    if (source === 'tableau') return cardIndex >= this.dragState.cardIndex;
    return cardIndex === this.dragState.cardIndex;
  }

  shouldHideForDrag(source: string, sourceIndex: number, cardIndex: number): boolean {
    return this.isDragging(source, sourceIndex, cardIndex);
  }

  isColumnHighlighted(index: number): boolean {
    return this.highlightedTarget?.type === 'tableau' && this.highlightedTarget.index === index;
  }

  isFreeCellHighlighted(index: number): boolean {
    return this.highlightedTarget?.type === 'freecell' && this.highlightedTarget.index === index;
  }

  isFoundationHighlighted(index: number): boolean {
    return this.highlightedTarget?.type === 'foundation' && this.highlightedTarget.index === index;
  }

  getDraggedCards(): Card[] {
    if (!this.dragState) return [];
    if (this.dragState.source === 'tableau') {
      return this.tableau[this.dragState.sourceIndex].slice(this.dragState.cardIndex);
    } else if (this.dragState.source === 'freecell') {
      const card = this.freeCells[this.dragState.sourceIndex];
      return card ? [card] : [];
    }
    return [];
  }

  // ── Movement Rules ──

  private getMaxMovable(emptyFreeCells: number, emptyColumns: number): number {
    return (1 + emptyFreeCells) * Math.pow(2, emptyColumns);
  }

  private countEmptyFreeCells(): number {
    return this.freeCells.filter(c => c === null).length;
  }

  private countEmptyColumns(excludeCol = -1): number {
    return this.tableau.filter((col, i) => i !== excludeCol && col.length === 0).length;
  }

  private isValidTableauStack(cards: Card[]): boolean {
    for (let i = 0; i < cards.length - 1; i++) {
      const top = cards[i];
      const bot = cards[i + 1];
      if (top.color === bot.color) return false;
      if (this.RANK_VALUES[top.rank] !== this.RANK_VALUES[bot.rank] + 1) return false;
    }
    return true;
  }

  private canPlaceOnTableau(card: Card, targetCol: number): boolean {
    if (this.tableau[targetCol].length === 0) return true;
    const top = this.tableau[targetCol][this.tableau[targetCol].length - 1];
    return top.color !== card.color && this.RANK_VALUES[top.rank] === this.RANK_VALUES[card.rank] + 1;
  }

  private canPlaceOnFoundation(card: Card, foundationIndex: number): boolean {
    const suit = this.FOUNDATION_SUIT_ORDER[foundationIndex];
    if (card.suit !== suit) return false;
    const pile = this.foundations[foundationIndex];
    if (pile.length === 0) return card.rank === 'A';
    const top = pile[pile.length - 1];
    return this.RANK_VALUES[card.rank] === this.RANK_VALUES[top.rank] + 1;
  }

  // ── Save / Restore State (for undo) ──

  private saveState() {
    this.history.push({
      tableau: this.tableau.map(col => [...col]),
      freeCells: [...this.freeCells],
      foundations: this.foundations.map(f => [...f]),
      moveCount: this.moveCount
    });
    if (this.history.length > 200) this.history.shift();
  }

  onUndo() {
    if (this.history.length === 0) return;
    const state = this.history.pop()!;
    this.tableau = state.tableau;
    this.freeCells = state.freeCells;
    this.foundations = state.foundations;
    this.moveCount = state.moveCount;
    this.selectedCard = null;
    this.persistGameState();
  }

  // ── Move Execution ──

  private moveCards(source: string, sourceIndex: number, cardIndex: number, destType: string, destIndex: number) {
    this.saveState();

    if (source === 'tableau') {
      const cards = this.tableau[sourceIndex].splice(cardIndex);
      if (destType === 'tableau') {
        this.tableau[destIndex].push(...cards);
      } else if (destType === 'freecell') {
        this.freeCells[destIndex] = cards[0];
      } else if (destType === 'foundation') {
        this.foundations[destIndex].push(cards[0]);
      }
    } else if (source === 'freecell') {
      const card = this.freeCells[sourceIndex]!;
      this.freeCells[sourceIndex] = null;
      if (destType === 'tableau') {
        this.tableau[destIndex].push(card);
      } else if (destType === 'freecell') {
        this.freeCells[destIndex] = card;
      } else if (destType === 'foundation') {
        this.foundations[destIndex].push(card);
      }
    }

    this.moveCount++;
    this.selectedCard = null;
    this.autoMoveToFoundations();
    this.checkWin();
    this.persistGameState();
  }

  // ── Auto-move safe cards to foundations ──

  private autoMoveToFoundations() {
    let moved = true;
    while (moved) {
      moved = false;
      for (let ci = 0; ci < 8; ci++) {
        if (this.tableau[ci].length === 0) continue;
        const card = this.tableau[ci][this.tableau[ci].length - 1];
        if (this.isSafeToAutoMove(card)) {
          const fi = this.FOUNDATION_SUIT_ORDER.indexOf(card.suit);
          if (fi !== -1 && this.canPlaceOnFoundation(card, fi)) {
            this.tableau[ci].pop();
            this.foundations[fi].push(card);
            moved = true;
          }
        }
      }
      for (let i = 0; i < 4; i++) {
        if (!this.freeCells[i]) continue;
        const card = this.freeCells[i]!;
        if (this.isSafeToAutoMove(card)) {
          const fi = this.FOUNDATION_SUIT_ORDER.indexOf(card.suit);
          if (fi !== -1 && this.canPlaceOnFoundation(card, fi)) {
            this.freeCells[i] = null;
            this.foundations[fi].push(card);
            moved = true;
          }
        }
      }
    }
  }

  private isSafeToAutoMove(card: Card): boolean {
    if (card.rank === 'A' || card.rank === '2') return true;
    const val = this.RANK_VALUES[card.rank];
    for (let fi = 0; fi < 4; fi++) {
      const fSuit = this.FOUNDATION_SUIT_ORDER[fi];
      if (this.SUIT_COLORS[fSuit] !== card.color) {
        if (this.foundations[fi].length < val - 1) return false;
      }
    }
    return true;
  }

  // ── Auto-move single card (double-click) ──

  autoMoveCard(source: string, sourceIndex: number, cardIndex: number) {
    let card: Card;
    if (source === 'tableau') {
      if (cardIndex !== this.tableau[sourceIndex].length - 1) return;
      card = this.tableau[sourceIndex][cardIndex];
    } else if (source === 'freecell') {
      const c = this.freeCells[sourceIndex];
      if (!c) return;
      card = c;
    } else return;

    // Try foundation first
    for (let fi = 0; fi < 4; fi++) {
      if (this.canPlaceOnFoundation(card, fi)) {
        this.moveCards(source, sourceIndex, cardIndex, 'foundation', fi);
        return;
      }
    }

    // Try tableau
    for (let ci = 0; ci < 8; ci++) {
      if (source === 'tableau' && ci === sourceIndex) continue;
      if (this.tableau[ci].length > 0 && this.canPlaceOnTableau(card, ci)) {
        this.moveCards(source, sourceIndex, cardIndex, 'tableau', ci);
        return;
      }
    }

    // Try free cell
    for (let i = 0; i < 4; i++) {
      if (this.freeCells[i] === null) {
        this.moveCards(source, sourceIndex, cardIndex, 'freecell', i);
        return;
      }
    }
  }

  // ── Win Detection ──

  private checkWin() {
    const total = this.foundations.reduce((s, f) => s + f.length, 0);
    if (total === 52) {
      this.gameWon = true;
      this.clearTimer();
      const m = Math.floor(this.timerSeconds / 60);
      const s = this.timerSeconds % 60;
      this.winStatsText = `Moves: ${this.moveCount}  |  Time: ${m}:${s.toString().padStart(2, '0')}`;
      if (this.currentGameId != null) {
        this.stats.recordWin(this.currentGameId, this.moveCount, this.timerSeconds);
      }
      this.clearSavedState();
      this.playTriumphantChord();
    }
  }

  // ── Trumpet Fanfare (Web Audio API) ──

  private playTriumphantChord() {
    if (!this.soundEnabled) return;
    const ctx = new AudioContext();
    const now = ctx.currentTime;
    const vol = this.volume / 100;

    // Fanfare motif: short punchy notes leading into sustained chords
    // Phrase 1: Da-da-da-DAAA (rising trumpet call)
    this.playBrass(ctx, 392.00, now,         0.15, 0.22 * vol); // G4
    this.playBrass(ctx, 392.00, now + 0.18,  0.15, 0.22 * vol); // G4
    this.playBrass(ctx, 392.00, now + 0.36,  0.15, 0.22 * vol); // G4
    this.playBrass(ctx, 523.25, now + 0.55,  0.60, 0.30 * vol); // C5 (held)

    // Phrase 2: rising run — E5, G5
    this.playBrass(ctx, 659.25, now + 1.25,  0.20, 0.25 * vol); // E5
    this.playBrass(ctx, 783.99, now + 1.50,  0.55, 0.28 * vol); // G5 (held)

    // Phrase 3: Grand final chord — full brass section
    const t3 = now + 2.2;
    this.playBrass(ctx, 261.63, t3, 2.0, 0.18 * vol); // C4
    this.playBrass(ctx, 329.63, t3, 2.0, 0.16 * vol); // E4
    this.playBrass(ctx, 392.00, t3, 2.0, 0.16 * vol); // G4
    this.playBrass(ctx, 523.25, t3, 2.0, 0.20 * vol); // C5
    this.playBrass(ctx, 659.25, t3, 2.0, 0.14 * vol); // E5
    this.playBrass(ctx, 783.99, t3, 2.0, 0.12 * vol); // G5
  }

  private playBrass(ctx: AudioContext, frequency: number, startTime: number, duration: number, volume: number) {
    // Layer multiple oscillators to simulate brass timbre
    const harmonics = [
      { type: 'sawtooth' as OscillatorType, detune: 0,  gain: 1.0 },
      { type: 'square'   as OscillatorType, detune: 1,  gain: 0.3 },
      { type: 'sawtooth' as OscillatorType, detune: -1, gain: 0.25 },
    ];

    const masterGain = ctx.createGain();
    // Brass-like envelope: quick attack, slight swell, sustain, decay
    masterGain.gain.setValueAtTime(0, startTime);
    masterGain.gain.linearRampToValueAtTime(volume * 0.9, startTime + 0.02);  // fast attack
    masterGain.gain.linearRampToValueAtTime(volume, startTime + 0.08);        // slight swell
    masterGain.gain.setValueAtTime(volume * 0.85, startTime + duration * 0.7);
    masterGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    masterGain.connect(ctx.destination);

    for (const h of harmonics) {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = h.type;
      osc.frequency.value = frequency;
      osc.detune.value = h.detune;
      oscGain.gain.value = h.gain;
      osc.connect(oscGain);
      oscGain.connect(masterGain);
      osc.start(startTime);
      osc.stop(startTime + duration + 0.05);
    }
  }

  // ── Drag & Drop (Mouse) ──

  onCardMouseDown(event: MouseEvent, source: string, sourceIndex: number, cardIndex: number) {
    if (this.gameWon) return;
    event.preventDefault();

    if (source === 'freecell') {
      this.startDrag(event.clientX, event.clientY, source, sourceIndex, 0);
      return;
    }

    if (source === 'tableau') {
      const col = this.tableau[sourceIndex];
      const stack = col.slice(cardIndex);
      if (!this.isValidTableauStack(stack)) return;
      this.startDrag(event.clientX, event.clientY, source, sourceIndex, cardIndex);
    }
  }

  private startDrag(clientX: number, clientY: number, source: string, sourceIndex: number, cardIndex: number) {
    this.selectedCard = null;

    let offsetX = 0;
    let offsetY = 0;

    if (source === 'tableau') {
      const colEl = this.el.nativeElement.querySelector(`.column[data-col="${sourceIndex}"]`);
      if (colEl) {
        const cardEls = colEl.querySelectorAll('.card');
        if (cardEls[cardIndex]) {
          const rect = (cardEls[cardIndex] as HTMLElement).getBoundingClientRect();
          offsetX = clientX - rect.left;
          offsetY = clientY - rect.top;
        }
      }
    } else if (source === 'freecell') {
      const slots = this.el.nativeElement.querySelectorAll('.free-cell');
      if (slots[sourceIndex]) {
        const cardEl = slots[sourceIndex].querySelector('.card');
        if (cardEl) {
          const rect = (cardEl as HTMLElement).getBoundingClientRect();
          offsetX = clientX - rect.left;
          offsetY = clientY - rect.top;
        }
      }
    }

    this.dragState = {
      source,
      sourceIndex,
      cardIndex,
      offsetX,
      offsetY,
      startX: clientX,
      startY: clientY,
      currentX: clientX,
      currentY: clientY,
      moved: false
    };

    document.addEventListener('mousemove', this.boundOnMouseMove);
    document.addEventListener('mouseup', this.boundOnMouseUp);
  }

  private onDocMouseMove(e: MouseEvent) {
    if (!this.dragState) return;
    const dx = e.clientX - this.dragState.startX;
    const dy = e.clientY - this.dragState.startY;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      this.dragState.moved = true;
    }
    this.dragState.currentX = e.clientX;
    this.dragState.currentY = e.clientY;
    this.updateHighlight(e.clientX, e.clientY);
  }

  private onDocMouseUp(e: MouseEvent) {
    document.removeEventListener('mousemove', this.boundOnMouseMove);
    document.removeEventListener('mouseup', this.boundOnMouseUp);

    if (!this.dragState) return;
    this.highlightedTarget = null;

    if (!this.dragState.moved) {
      this.handleClick(this.dragState.source, this.dragState.sourceIndex, this.dragState.cardIndex);
      this.dragState = null;
      return;
    }

    const target = this.findDropTarget(e.clientX, e.clientY);
    if (target) {
      this.attemptMove(this.dragState.source, this.dragState.sourceIndex, this.dragState.cardIndex, target.type, target.index);
    }

    this.dragState = null;
  }

  // ── Touch Support ──

  onCardTouchStart(event: TouchEvent, source: string, sourceIndex: number, cardIndex: number) {
    if (this.gameWon) return;
    event.preventDefault();
    const touch = event.touches[0];

    if (source === 'freecell') {
      this.startDrag(touch.clientX, touch.clientY, source, sourceIndex, 0);
    } else if (source === 'tableau') {
      const col = this.tableau[sourceIndex];
      const stack = col.slice(cardIndex);
      if (!this.isValidTableauStack(stack)) return;
      this.startDrag(touch.clientX, touch.clientY, source, sourceIndex, cardIndex);
    }

    document.addEventListener('touchmove', this.boundOnTouchMove, { passive: false });
    document.addEventListener('touchend', this.boundOnTouchEnd);
  }

  private onDocTouchMove(e: TouchEvent) {
    if (!this.dragState) return;
    e.preventDefault();
    const touch = e.touches[0];
    const dx = touch.clientX - this.dragState.startX;
    const dy = touch.clientY - this.dragState.startY;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      this.dragState.moved = true;
    }
    this.dragState.currentX = touch.clientX;
    this.dragState.currentY = touch.clientY;
    this.updateHighlight(touch.clientX, touch.clientY);
  }

  private onDocTouchEnd(e: TouchEvent) {
    document.removeEventListener('touchmove', this.boundOnTouchMove);
    document.removeEventListener('touchend', this.boundOnTouchEnd);

    if (!this.dragState) return;
    this.highlightedTarget = null;

    if (!this.dragState.moved) {
      this.handleClick(this.dragState.source, this.dragState.sourceIndex, this.dragState.cardIndex);
      this.dragState = null;
      return;
    }

    const touch = e.changedTouches[0];
    const target = this.findDropTarget(touch.clientX, touch.clientY);
    if (target) {
      this.attemptMove(this.dragState.source, this.dragState.sourceIndex, this.dragState.cardIndex, target.type, target.index);
    }

    this.dragState = null;
  }

  private removeDragListeners() {
    document.removeEventListener('mousemove', this.boundOnMouseMove);
    document.removeEventListener('mouseup', this.boundOnMouseUp);
    document.removeEventListener('touchmove', this.boundOnTouchMove);
    document.removeEventListener('touchend', this.boundOnTouchEnd);
  }

  // ── Click-to-move ──

  private handleClick(source: string, sourceIndex: number, cardIndex: number) {
    // Manual double-click detection (native dblclick can be unreliable when Angular re-renders elements)
    const now = Date.now();
    if (this.lastClickInfo &&
      now - this.lastClickTime < 400 &&
      this.lastClickInfo.source === source &&
      this.lastClickInfo.sourceIndex === sourceIndex &&
      this.lastClickInfo.cardIndex === cardIndex) {
      this.lastClickInfo = null;
      this.selectedCard = null;
      this.autoMoveCard(source, sourceIndex, cardIndex);
      return;
    }
    this.lastClickInfo = { source, sourceIndex, cardIndex };
    this.lastClickTime = now;

    if (this.selectedCard) {
      if (source === 'tableau') {
        this.attemptMove(this.selectedCard.source, this.selectedCard.sourceIndex, this.selectedCard.cardIndex, 'tableau', sourceIndex);
      } else if (source === 'freecell') {
        if (this.freeCells[sourceIndex] === null) {
          this.attemptMove(this.selectedCard.source, this.selectedCard.sourceIndex, this.selectedCard.cardIndex, 'freecell', sourceIndex);
        } else {
          this.selectedCard = { source: 'freecell', sourceIndex, cardIndex: 0 };
        }
      }
      return;
    }

    // Select this card
    if (source === 'tableau') {
      const col = this.tableau[sourceIndex];
      const stack = col.slice(cardIndex);
      if (this.isValidTableauStack(stack)) {
        this.selectedCard = { source, sourceIndex, cardIndex };
      }
    } else if (source === 'freecell' && this.freeCells[sourceIndex]) {
      this.selectedCard = { source, sourceIndex, cardIndex: 0 };
    }
  }

  // ── Slot Click Handlers ──

  onFreeCellClick(event: MouseEvent, index: number) {
    if ((event.target as HTMLElement).closest('.card')) return;
    if (this.selectedCard && this.freeCells[index] === null) {
      this.attemptMove(this.selectedCard.source, this.selectedCard.sourceIndex, this.selectedCard.cardIndex, 'freecell', index);
    }
  }

  onFoundationClick(event: MouseEvent, index: number) {
    if (this.selectedCard) {
      this.attemptMove(this.selectedCard.source, this.selectedCard.sourceIndex, this.selectedCard.cardIndex, 'foundation', index);
    }
  }

  onColumnClick(event: MouseEvent, colIndex: number) {
    if ((event.target as HTMLElement).closest('.card')) return;
    if (this.selectedCard && this.tableau[colIndex].length === 0) {
      this.attemptMove(this.selectedCard.source, this.selectedCard.sourceIndex, this.selectedCard.cardIndex, 'tableau', colIndex);
    }
  }

  onGameAreaClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.card') && !target.closest('.cell-slot') && !target.closest('.column')) {
      this.selectedCard = null;
    }
  }

  // ── Drop Target Detection ──

  private findDropTarget(x: number, y: number): { type: string; index: number } | null {
    const nativeEl = this.el.nativeElement;
    const PAD = 30;
    const dragRect = this.getDraggedCardRect();

    let bestSlot: { type: string; index: number } | null = null;
    let bestOverlap = 0;

    // Check foundations
    const foundationEls = nativeEl.querySelectorAll('.foundation');
    for (let i = 0; i < 4; i++) {
      const rect = (foundationEls[i] as HTMLElement).getBoundingClientRect();
      if (dragRect) {
        const expanded = { left: rect.left - PAD, right: rect.right + PAD, top: rect.top - PAD, bottom: rect.bottom + PAD };
        if (this.rectsOverlap(dragRect, expanded)) {
          const area = this.overlapArea(dragRect, expanded);
          if (area > bestOverlap) {
            bestOverlap = area;
            bestSlot = { type: 'foundation', index: i };
          }
        }
      } else if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
        return { type: 'foundation', index: i };
      }
    }

    // Check free cells
    const freeCellEls = nativeEl.querySelectorAll('.free-cell');
    for (let i = 0; i < 4; i++) {
      const rect = (freeCellEls[i] as HTMLElement).getBoundingClientRect();
      if (dragRect) {
        const expanded = { left: rect.left - PAD, right: rect.right + PAD, top: rect.top - PAD, bottom: rect.bottom + PAD };
        if (this.rectsOverlap(dragRect, expanded)) {
          const area = this.overlapArea(dragRect, expanded);
          if (area > bestOverlap) {
            bestOverlap = area;
            bestSlot = { type: 'freecell', index: i };
          }
        }
      } else if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
        return { type: 'freecell', index: i };
      }
    }

    if (bestSlot) return bestSlot;

    // Check tableau columns — extend hit area to bottom of viewport
    const colEls = nativeEl.querySelectorAll('.column');
    const viewportBottom = window.innerHeight;
    for (let i = 0; i < 8; i++) {
      const rect = (colEls[i] as HTMLElement).getBoundingClientRect();
      if (x >= rect.left - PAD && x <= rect.right + PAD && y >= rect.top && y <= Math.max(rect.bottom, viewportBottom)) {
        return { type: 'tableau', index: i };
      }
    }

    return null;
  }

  private getDraggedCardRect(): { left: number; right: number; top: number; bottom: number } | null {
    if (!this.dragState || !this.dragState.moved) return null;
    const cardEl = this.el.nativeElement.querySelector('.card') as HTMLElement;
    if (!cardEl) return null;
    const w = cardEl.offsetWidth;
    const h = cardEl.offsetHeight;
    const left = this.dragState.currentX - this.dragState.offsetX;
    const top = this.dragState.currentY - this.dragState.offsetY;
    return { left, top, right: left + w, bottom: top + h };
  }

  private rectsOverlap(a: any, b: any): boolean {
    return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
  }

  private overlapArea(a: any, b: any): number {
    const xOverlap = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
    const yOverlap = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
    return xOverlap * yOverlap;
  }

  private updateHighlight(x: number, y: number) {
    this.highlightedTarget = this.findDropTarget(x, y);
  }

  // ── Attempt Move ──

  private attemptMove(source: string, sourceIndex: number, cardIndex: number, destType: string, destIndex: number) {
    // Same location
    if (source === destType && sourceIndex === destIndex) {
      this.selectedCard = null;
      return;
    }

    let card: Card;
    let stackSize = 1;

    if (source === 'tableau') {
      card = this.tableau[sourceIndex][cardIndex];
      stackSize = this.tableau[sourceIndex].length - cardIndex;
    } else if (source === 'freecell') {
      const c = this.freeCells[sourceIndex];
      if (!c) return;
      card = c;
    } else return;

    if (destType === 'foundation') {
      if (stackSize > 1) { this.selectedCard = null; return; }
      if (this.canPlaceOnFoundation(card, destIndex)) {
        this.moveCards(source, sourceIndex, cardIndex, 'foundation', destIndex);
      } else {
        this.selectedCard = null;
      }
    } else if (destType === 'freecell') {
      if (stackSize > 1) { this.selectedCard = null; return; }
      if (this.freeCells[destIndex] === null) {
        this.moveCards(source, sourceIndex, cardIndex, 'freecell', destIndex);
      } else {
        this.selectedCard = null;
      }
    } else if (destType === 'tableau') {
      if (!this.canPlaceOnTableau(card, destIndex)) {
        if (this.tableau[destIndex].length > 0) {
          this.selectedCard = null;
          return;
        }
      }

      const emptyFree = this.countEmptyFreeCells();
      const emptyColsExcluding = this.countEmptyColumns(destIndex);
      const maxMovable = this.getMaxMovable(emptyFree, emptyColsExcluding);

      if (stackSize > maxMovable) {
        this.selectedCard = null;
        return;
      }

      if (source === 'tableau' && stackSize > 1) {
        const stack = this.tableau[sourceIndex].slice(cardIndex);
        if (!this.isValidTableauStack(stack)) {
          this.selectedCard = null;
          return;
        }
      }

      if (this.canPlaceOnTableau(card, destIndex) || this.tableau[destIndex].length === 0) {
        this.moveCards(source, sourceIndex, cardIndex, 'tableau', destIndex);
      } else {
        this.selectedCard = null;
      }
    }
  }

  // ── Keyboard Shortcuts ──

  @HostListener('document:keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    if (e.ctrlKey && e.key === 'z') {
      e.preventDefault();
      this.onUndo();
    }
    if (e.key === 'Escape') {
      this.selectedCard = null;
    }
    if (e.key === 'w' || e.key === 'W') {
      this.triggerWin();
    }
  }

  private triggerWin() {
    if (this.gameWon) return;
    this.gameWon = true;
    this.clearTimer();
    const m = Math.floor(this.timerSeconds / 60);
    const s = this.timerSeconds % 60;
    this.winStatsText = `Moves: ${this.moveCount}  |  Time: ${m}:${s.toString().padStart(2, '0')}`;
    this.playTriumphantChord();
  }

  // ── Stats Popup ──

  openStats() {
    this.statsPopup.open();
  }

  // ── Game State Persistence ──

  private persistGameState() {
    const state = {
      tableau: this.tableau,
      freeCells: this.freeCells,
      foundations: this.foundations,
      moveCount: this.moveCount,
      timerSeconds: this.timerSeconds,
      gameWon: this.gameWon,
      winStatsText: this.winStatsText,
      currentGameId: this.currentGameId,
      history: this.history,
    };
    try {
      localStorage.setItem(FreeCellComponent.SAVE_KEY, JSON.stringify(state));
    } catch { /* quota exceeded – ignore */ }
  }

  private restoreGameState(): boolean {
    try {
      const raw = localStorage.getItem(FreeCellComponent.SAVE_KEY);
      if (!raw) return false;
      const state = JSON.parse(raw);
      if (!state.tableau || !state.freeCells || !state.foundations) return false;

      this.tableau = state.tableau;
      this.freeCells = state.freeCells;
      this.foundations = state.foundations;
      this.moveCount = state.moveCount ?? 0;
      this.timerSeconds = state.timerSeconds ?? 0;
      this.gameWon = state.gameWon ?? false;
      this.winStatsText = state.winStatsText ?? '';
      this.currentGameId = state.currentGameId ?? null;
      this.history = state.history ?? [];

      this.selectedCard = null;
      this.dragState = null;
      this.highlightedTarget = null;

      if (!this.gameWon) {
        this.startTimer();
      }
      return true;
    } catch {
      return false;
    }
  }

  private clearSavedState() {
    localStorage.removeItem(FreeCellComponent.SAVE_KEY);
  }

  // ── Settings Persistence ──

  saveSettings() {
    const settings = { soundEnabled: this.soundEnabled, volume: this.volume };
    try {
      localStorage.setItem(FreeCellComponent.SETTINGS_KEY, JSON.stringify(settings));
    } catch { /* ignore */ }
  }

  private loadSettings() {
    try {
      const raw = localStorage.getItem(FreeCellComponent.SETTINGS_KEY);
      if (!raw) return;
      const s = JSON.parse(raw);
      if (s.soundEnabled !== undefined) this.soundEnabled = s.soundEnabled;
      if (s.volume !== undefined) this.volume = s.volume;
    } catch { /* ignore */ }
  }
}

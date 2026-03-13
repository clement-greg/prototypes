/**
 * Paperboy Game – Input handling (keyboard + gamepad).
 */
import { InputState } from './types';

export class InputManager {
  state: InputState = {
    left: false, right: false, up: false, down: false,
    throw: false, throwPressed: false,
    brake: false, accelerate: false,
  };

  private keys = new Set<string>();
  private prevThrow = false;
  private boundKeyDown: (e: KeyboardEvent) => void;
  private boundKeyUp: (e: KeyboardEvent) => void;

  gamepadConnected = false;
  private gamepadIndex = -1;

  constructor() {
    this.boundKeyDown = (e: KeyboardEvent) => this.onKeyDown(e);
    this.boundKeyUp = (e: KeyboardEvent) => this.onKeyUp(e);

    window.addEventListener('keydown', this.boundKeyDown);
    window.addEventListener('keyup', this.boundKeyUp);
    window.addEventListener('gamepadconnected', (e) => {
      this.gamepadIndex = (e as GamepadEvent).gamepad.index;
      this.gamepadConnected = true;
    });
    window.addEventListener('gamepaddisconnected', () => {
      this.gamepadConnected = false;
      this.gamepadIndex = -1;
    });
  }

  private onKeyDown(e: KeyboardEvent): void {
    this.keys.add(e.code);
    // Prevent page scrolling when playing
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
      e.preventDefault();
    }
  }

  private onKeyUp(e: KeyboardEvent): void {
    this.keys.delete(e.code);
  }

  /** Call once per frame to update the input state. */
  update(): void {
    // Keyboard
    const kbLeft = this.keys.has('ArrowLeft') || this.keys.has('KeyA');
    const kbRight = this.keys.has('ArrowRight') || this.keys.has('KeyD');
    const kbUp = this.keys.has('ArrowUp') || this.keys.has('KeyW');
    const kbDown = this.keys.has('ArrowDown') || this.keys.has('KeyS');
    const kbThrow = this.keys.has('Space');
    const kbBrake = this.keys.has('ShiftLeft') || this.keys.has('ShiftRight');
    const kbAccel = this.keys.has('ControlLeft') || this.keys.has('ControlRight');

    // Gamepad
    let gpLeft = false, gpRight = false, gpUp = false, gpDown = false;
    let gpThrow = false, gpBrake = false, gpAccel = false;

    if (this.gamepadIndex >= 0) {
      const gamepads = navigator.getGamepads();
      const gp = gamepads[this.gamepadIndex];
      if (gp) {
        // Left stick
        const deadzone = 0.3;
        if (gp.axes[0] < -deadzone) gpLeft = true;
        if (gp.axes[0] > deadzone) gpRight = true;
        if (gp.axes[1] < -deadzone) gpUp = true;
        if (gp.axes[1] > deadzone) gpDown = true;

        // D-pad (buttons 12-15 on standard mapping)
        if (gp.buttons[12]?.pressed) gpUp = true;
        if (gp.buttons[13]?.pressed) gpDown = true;
        if (gp.buttons[14]?.pressed) gpLeft = true;
        if (gp.buttons[15]?.pressed) gpRight = true;

        // A/Cross = throw (button 0)
        if (gp.buttons[0]?.pressed) gpThrow = true;
        // B/Circle = brake (button 1)
        if (gp.buttons[1]?.pressed) gpBrake = true;
        // X/Square = accelerate (button 2)
        if (gp.buttons[2]?.pressed) gpAccel = true;
      }
    }

    this.state.left = kbLeft || gpLeft;
    this.state.right = kbRight || gpRight;
    this.state.up = kbUp || gpUp;
    this.state.down = kbDown || gpDown;
    this.state.brake = kbBrake || gpBrake;
    this.state.accelerate = kbAccel || gpAccel;

    const throwNow = kbThrow || gpThrow;
    this.state.throwPressed = throwNow && !this.prevThrow;
    this.state.throw = throwNow;
    this.prevThrow = throwNow;
  }

  destroy(): void {
    window.removeEventListener('keydown', this.boundKeyDown);
    window.removeEventListener('keyup', this.boundKeyUp);
  }
}

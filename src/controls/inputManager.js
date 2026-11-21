/**
 * Global Non-Reactive Input Manager (Revision 4)
 * Zero React state updates on key events.
 * Handles window blur and pointer lock exits to prevent sticky keys.
 */
class InputManager {
  constructor() {
    this.keys = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      sprint: false,
      jump: false,
    };

    this.mouse = {
      movementX: 0,
      movementY: 0,
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', this.handleKeyDown);
      window.addEventListener('keyup', this.handleKeyUp);
      window.addEventListener('blur', this.handleBlur);
      document.addEventListener('pointerlockchange', this.handlePointerLockChange);
    }
  }

  handleKeyDown = (e) => {
    // Avoid capturing inputs if an input or textarea is active
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;

    switch (e.code) {
      case 'KeyW':
      case 'ArrowUp':
        this.keys.forward = true;
        break;
      case 'KeyS':
      case 'ArrowDown':
        this.keys.backward = true;
        break;
      case 'KeyA':
      case 'ArrowLeft':
        this.keys.left = true;
        break;
      case 'KeyD':
      case 'ArrowRight':
        this.keys.right = true;
        break;
      case 'ShiftLeft':
      case 'ShiftRight':
        this.keys.sprint = true;
        break;
      case 'Space':
        this.keys.jump = true;
        break;
      default:
        break;
    }
  };

  handleKeyUp = (e) => {
    switch (e.code) {
      case 'KeyW':
      case 'ArrowUp':
        this.keys.forward = false;
        break;
      case 'KeyS':
      case 'ArrowDown':
        this.keys.backward = false;
        break;
      case 'KeyA':
      case 'ArrowLeft':
        this.keys.left = false;
        break;
      case 'KeyD':
      case 'ArrowRight':
        this.keys.right = false;
        break;
      case 'ShiftLeft':
      case 'ShiftRight':
        this.keys.sprint = false;
        break;
      case 'Space':
        this.keys.jump = false;
        break;
      default:
        break;
    }
  };

  handleBlur = () => {
    this.resetKeys();
  };

  handlePointerLockChange = () => {
    if (!document.pointerLockElement) {
      this.resetKeys();
    }
  };

  resetKeys() {
    this.keys.forward = false;
    this.keys.backward = false;
    this.keys.left = false;
    this.keys.right = false;
    this.keys.sprint = false;
    this.keys.jump = false;
    this.mouse.movementX = 0;
    this.mouse.movementY = 0;
  }
}

export const inputManager = new InputManager();

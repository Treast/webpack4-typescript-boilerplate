import { Vector2 } from './utils/Vector2';

class Canvas {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  constructor() {
    this.canvas = document.querySelector('canvas');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext('2d');
  }

  render() {
    requestAnimationFrame(() => this.render());
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = 'red';
  }

  lerp(a: number, b: number, n: number) {
    return (1 - n) * a + n * b;
  }
}

export default new Canvas();

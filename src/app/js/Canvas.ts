import { Vector2 } from './utils/Vector2';
import Perspective from './utils/Perspective';

class Canvas {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private corners: Vector2[] = [];
  private position: Vector2 = new Vector2(0.5, 0.5);
  private nextPosition: Vector2 = new Vector2(0.5, 0.5);
  private rawPoint: Vector2 = new Vector2(0.5, 0.5);
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

    const positionX = this.lerp(this.position.x, this.nextPosition.x, 0.1);
    const positionY = this.lerp(this.position.y, this.nextPosition.y, 0.1);
    this.position = new Vector2(positionX, positionY);

    if (Perspective.hasMatrix()) {
      Perspective.computePoint(this.rawPoint).then((point: number[]) => {
        this.ctx.fillRect(point[0] * window.innerWidth - 10, point[1] * window.innerHeight - 10, 20, 20);
      });
    } else {
      this.ctx.fillRect(this.position.x - 10, this.position.y - 10, 20, 20);
    }
  }

  setPosition(x: number, y: number) {
    this.nextPosition = new Vector2(x * window.innerWidth, y * window.innerHeight);
    this.rawPoint = new Vector2(x, y);
  }

  lerp(a: number, b: number, n: number) {
    return (1 - n) * a + n * b;
  }
}

export default new Canvas();

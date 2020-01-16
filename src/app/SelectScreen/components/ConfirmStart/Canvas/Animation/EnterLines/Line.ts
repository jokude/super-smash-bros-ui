import TWEEN from '@tweenjs/tween.js';
import { Square } from './Square';

const LINE_POSITION = 0.8;
const LINE_WIDTH = 15;
const COLOR_START = 'rgba(0, 0, 0, 0)';
const COLOR_STOP = '#ffffff';

class Line {
  private context: CanvasRenderingContext2D;
  private tween: TWEEN.Tween;
  private squares: Square[] = [];
  private x1: number;
  private y1: number;
  private x2: number;
  private y2: number;
  private xd: number;
  private yd: number;

  constructor(context: CanvasRenderingContext2D, duration: number, x1: number, y1: number, x2: number, y2: number) {
    this.context = context;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.xd = this.x2 - this.x1;
    this.yd = this.y2 - this.y1;

    this.tween = new TWEEN.Tween({ positionIncrement: -LINE_POSITION })
      .to({ positionIncrement: 1 }, duration)
      .easing(TWEEN.Easing.Linear.None)
      .onUpdate(this.draw)
      .onComplete(this.destroy);
  }

  init = () => this.tween.start();

  draw = ({ positionIncrement }: { positionIncrement: number }) => {
    const positionIncrementOffset = positionIncrement + LINE_POSITION;
    const startX = this.x1 + this.xd * positionIncrement;
    const startY = this.y1 + this.yd * positionIncrement;
    const endX = this.x1 + this.xd * positionIncrementOffset;
    const endY = this.y1 + this.yd * positionIncrementOffset;

    const grad = this.context.createLinearGradient(startX, 0, endX, this.context.canvas.height);
    grad.addColorStop(0, COLOR_START);
    grad.addColorStop(1, COLOR_STOP);

    this.context.lineWidth = LINE_WIDTH;
    this.context.strokeStyle = grad;
    this.context.beginPath();
    this.context.moveTo(startX, startY);
    this.context.lineTo(endX, endY);
    this.context.stroke();

    this.generateSquare(endX, endY);
  };

  update = () => {
    if (this.tween.isPlaying()) {
      this.tween.update(TWEEN.now());
      this.updateSquares();
    }
  };

  destroy = () => {
    this.destroySquares();
    this.tween.stop();
    TWEEN.remove(this.tween);
  };

  generateSquare = (x: number, y: number) => {
    if (this.squares.length < 20) {
      const square = new Square(this.context, x, y);
      square.init();
      this.squares.push(square);
    }
  };

  updateSquares = () => {
    this.squares = this.squares.filter(square => square.isPlaying());
    this.squares.forEach(square => square.update());
  };

  destroySquares = () => this.squares.forEach(square => square.destroy());
}

export { Line };

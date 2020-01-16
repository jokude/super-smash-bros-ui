import { Line } from './Line';

class EnterLines {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private line1: Line;
  private line2: Line;

  constructor(canvas: HTMLCanvasElement, duration: number) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.line1 = new Line(
      this.context,
      duration,
      0,
      this.canvas.height - 15,
      this.canvas.width,
      this.canvas.height - 15
    );
    this.line2 = new Line(
      this.context,
      duration,
      0,
      this.canvas.height * 0.65 - this.canvas.height * 0.1,
      this.canvas.width,
      this.canvas.height * 0.05
    );
  }

  init = () => {
    this.line1.init();
    this.line2.init();
  };

  update = () => {
    this.line1.update();
    this.line2.update();
  };

  destroy = () => {
    this.line1.destroy();
    this.line2.destroy();
  };
}

export { EnterLines };

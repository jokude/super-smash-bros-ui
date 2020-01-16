import { EnterLines } from './EnterLines';
import { LightingGroup } from './LightingGroup';

class CanvasAnimation {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private lines: EnterLines;
  private lighting: LightingGroup;
  private animating = false;

  constructor(canvas: HTMLCanvasElement, duration: number) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.lines = new EnterLines(canvas, duration);
    this.lighting = new LightingGroup(this.context);
  }

  init = () => {
    this.animating = true;
    this.lines.init();
    this.animate();
  };

  animate = () => {
    if (this.animating) {
      this.clear();
      this.update();
      window.requestAnimationFrame(this.animate);
    }
  };

  clear = () => {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };

  update = () => {
    this.lines.update();
    this.lighting.update();
  };

  stop = () => {
    this.animating = false;
    this.clear();
    this.lines.destroy();
    this.lighting.destroy();
  };
}

export { CanvasAnimation };

import { RaylightGroup } from './RaylightGroup';

class CanvasAnimation {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private raylights: RaylightGroup;
  private animating = false;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.raylights = new RaylightGroup(this.context);
  }

  init = () => {
    this.animating = true;
    this.animate();
  };

  animate = () => {
    if (this.animating) {
      this.clear();
      this.update();
      window.requestAnimationFrame(this.animate);
    }
  };

  clear = () => this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

  update = () => this.raylights.update();

  stop = () => {
    this.animating = false;
    this.clear();
    this.raylights.destroy();
  };
}

export { CanvasAnimation };

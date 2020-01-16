import TWEEN from '@tweenjs/tween.js';

class Raylight {
  private context: CanvasRenderingContext2D;
  private tween: TWEEN.Tween;
  private x1: number;
  private y1: number;
  private x2: number;
  private y2: number;

  constructor(
    context: CanvasRenderingContext2D,
    duration: number,
    size: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ) {
    this.context = context;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;

    this.tween = new TWEEN.Tween({ size, opacity: 0.6 })
      .to({ size: size / 2, opacity: 0.1 }, duration)
      .easing(TWEEN.Easing.Linear.None)
      .onUpdate(this.draw)
      .onComplete(this.destroy);
  }

  init = () => this.tween.start();

  isPlaying = () => this.tween.isPlaying();

  draw = ({ opacity, size }: { size: number; opacity: number }) => {
    const xdiff = this.x1 - this.x2;
    const ydiff = this.y1 - this.y2;
    const angle = -Math.atan2(ydiff, xdiff);

    const mx = (this.x1 + this.x2) / 2;
    const my = (this.y1 + this.y2) / 2;
    const x = mx + Math.sin(angle) * size;
    const y = my + Math.cos(angle) * size;
    const xx = mx + Math.sin(angle) * -size;
    const yy = my + Math.cos(angle) * -size;

    const grad = this.context.createLinearGradient(x, y, xx, yy);
    grad.addColorStop(0, 'rgba(255, 251, 216, 0)');
    grad.addColorStop(0.5, `rgba(255, 251, 216, ${opacity})`);
    grad.addColorStop(1, 'rgba(255, 251, 216, 0)');

    //this.context.filter = 'blur(6px)';
    this.context.lineWidth = size;
    this.context.beginPath();
    this.context.strokeStyle = grad;
    this.context.moveTo(this.x1, this.y1);
    this.context.lineTo(this.x2, this.y2);
    this.context.stroke();
  };

  update = () => {
    if (this.tween.isPlaying()) {
      this.tween.update(TWEEN.now());
    }
  };

  destroy = () => {
    this.tween.stop();
    TWEEN.remove(this.tween);
  };
}

export { Raylight };

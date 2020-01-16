import TWEEN from '@tweenjs/tween.js';
import { getRandomNumberInRange } from '../../../../../helpers';
import { Vector } from './Vector';

class Lighting {
  private context: CanvasRenderingContext2D;
  private tween: TWEEN.Tween;
  private points: Vector[];

  constructor(context: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) {
    this.context = context;

    this.points = this.generatePoints(new Vector(x1, y1), new Vector(x2, y2));

    this.tween = new TWEEN.Tween({ opacity: 0.6 })
      .to({ opacity: 0 }, 150)
      .delay(getRandomNumberInRange(200, 500))
      .easing(TWEEN.Easing.Bounce.InOut)
      .onUpdate(this.draw)
      .onComplete(this.destroy);
  }

  init = () => this.tween.start();

  generatePoints = (start: Vector, end: Vector) => {
    const results = [start];
    const positions = [0, ...Array(30).keys()].map(() => Math.random()).sort();
    const Sway = 200;
    const Jaggedness = 1 / Sway;

    const tangent = end.subtract(start);
    const normal = new Vector(tangent.y, -tangent.x).normalize();
    const length = tangent.getMagnitude();

    let prevDisplacement = 0;
    for (let i = 1; i < positions.length; i++) {
      const pos = positions[i];

      const scale = length * Jaggedness * (pos - positions[i - 1]);
      const envelope = pos > 0.95 ? 20 * (1 - pos) : 1;

      let displacement = getRandomNumberInRange(-Sway, Sway);
      displacement -= (displacement - prevDisplacement) * (1 - scale);
      displacement *= envelope;

      const point = start.add(tangent.multiply(pos)).add(normal.multiply(displacement));
      results.push(point);
      prevDisplacement = displacement;
    }

    results.push(end);

    return results;
  };

  draw = ({ opacity }: { opacity: number }) => {
    const x1 = this.points[0].x;
    const y1 = this.points[0].y;
    const x2 = this.points[this.points.length - 1].x;
    const y2 = this.points[this.points.length - 1].y;

    const grad = this.context.createLinearGradient(x1, y1, x2, y2);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0');
    grad.addColorStop(0.35, `rgba(255, 255, 255, ${opacity})`);
    grad.addColorStop(0.5, `rgba(255, 255, 255, 1)`);
    grad.addColorStop(0.65, `rgba(255, 255, 255, ${opacity})`);
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

    this.context.globalCompositeOperation = 'lighter';
    this.context.lineCap = 'round';

    this.context.beginPath();
    this.context.moveTo(x1, y1);
    for (let i = 1; i < this.points.length - 1; i++) {
      this.context.lineWidth = 7;
      this.context.strokeStyle = `rgba(255, 0, 0, ${opacity / 2})`;
      this.context.shadowColor = 'rgb(255, 128, 128)';
      this.context.shadowBlur = 8;
      this.context.lineTo(this.points[i + 1].x, this.points[i + 1].y);
    }
    this.context.stroke();

    this.context.beginPath();
    this.context.moveTo(x1, y1);
    for (let i = 1; i < this.points.length - 1; i++) {
      this.context.lineWidth = 3;
      this.context.strokeStyle = grad;
      this.context.shadowColor = 'none';
      this.context.shadowBlur = 0;
      this.context.lineTo(this.points[i + 1].x, this.points[i + 1].y);
    }
    this.context.stroke();
  };

  update = () => {
    if (this.isPlaying()) {
      this.tween.update(TWEEN.now());
    }
  };

  isPlaying = () => this.tween.isPlaying();

  destroy = () => {
    this.tween.stop();
    TWEEN.remove(this.tween);
  };
}

export { Lighting };

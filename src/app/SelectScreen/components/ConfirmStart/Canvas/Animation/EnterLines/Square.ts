import TWEEN from '@tweenjs/tween.js';
import { getRandomNumberInRange } from '../../../../../helpers';

const MAX_ORIGIN_DISTANCE = 20;
const MAX_SIZE = 50;
const MIN_SIZE = 10;
const COLOR = '#ffffff';

class Square {
  private context: CanvasRenderingContext2D;
  private tween: TWEEN.Tween;
  private originX: number;
  private originY: number;

  constructor(context: CanvasRenderingContext2D, x: number, y: number) {
    const initialSize = getRandomNumberInRange(MAX_SIZE, MIN_SIZE);
    this.originX = getRandomNumberInRange(x - MAX_ORIGIN_DISTANCE, x + MAX_ORIGIN_DISTANCE) - initialSize / 2;
    this.originY = getRandomNumberInRange(y - MAX_ORIGIN_DISTANCE, y + MAX_ORIGIN_DISTANCE) - initialSize / 2;
    this.context = context;

    this.tween = new TWEEN.Tween({ size: initialSize })
      .to({ size: 0 }, 300)
      .easing(TWEEN.Easing.Linear.None)
      .onUpdate(this.draw)
      .onComplete(this.destroy);
  }

  init = () => this.tween.start();

  draw = ({ size }: { size: number }) => {
    this.context.fillStyle = COLOR;
    this.context.fillRect(this.originX, this.originY, size, size);
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

export { Square };

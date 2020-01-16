import { Raylight } from './Raylight';
import { getRandomNumberInRange } from '../../../../../helpers';

const MAX_RAYLIGHTS = 10;
const MIN_LINE_WIDTH = 5;
const MAX_LINE_WIDTH = 50;

class RaylightGroup {
  private context: CanvasRenderingContext2D;
  private raylights: Raylight[] = [];
  private raylightOriginX: number;
  private raylightOriginY: number;

  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
    this.raylightOriginX = this.context.canvas.width - 30;
    this.raylightOriginY = -this.context.canvas.height * 2;
  }

  update = () => {
    this.generateRaylight();
    this.updateRaylights();
  };

  destroy = () => this.destroyRaylights();

  generateRaylight = () => {
    if (this.raylights.length < MAX_RAYLIGHTS) {
      const x1 = this.raylightOriginX;
      const y1 = this.raylightOriginY;
      const angle = getRandomNumberInRange(0, 60);

      const duration = getRandomNumberInRange(500, 1000);
      const size = getRandomNumberInRange(MIN_LINE_WIDTH, MAX_LINE_WIDTH);
      const x2 = x1 + 10000 * Math.cos(angle);
      const y2 = y1 + 10000 * Math.sin(angle);

      const raylight = new Raylight(this.context, duration, size, x1, y1, x2, y2);
      raylight.init();
      this.raylights.push(raylight);
    }
  };

  updateRaylights = () => {
    this.raylights = this.raylights.filter(raylight => raylight.isPlaying());
    this.raylights.forEach(raylight => raylight.update());
  };

  destroyRaylights = () => this.raylights.forEach(raylight => raylight.destroy());
}

export { RaylightGroup };

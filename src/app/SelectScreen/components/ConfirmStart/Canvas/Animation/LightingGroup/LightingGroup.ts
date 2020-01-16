import { Lighting } from './Lighting';
import { Vector } from './Vector';

type Triangle = number[][];

const MAX_LIGHTINGS = 3;
const MAX_LIGHTING_DISTANCE = 150;

class LightingGroup {
  private context: CanvasRenderingContext2D;
  private group: Lighting[] = [];
  private triangles: Triangle[];
  private distribution: number[];

  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
    const bounds = this.getPolygonBounds();
    this.triangles = [
      [bounds[2], bounds[3], bounds[0]],
      [bounds[0], bounds[1], bounds[2]]
    ];
    this.distribution = this.generateDistribution(this.triangles);
  }

  getPolygonBounds = (): number[][] => {
    const width = this.context.canvas.width;
    const height = this.context.canvas.height / 1.2;
    const canvasOffset = height * 0.1;
    const minX = 0;
    const maxX = width;
    const minY = canvasOffset + height * 0.609;
    const maxY = this.context.canvas.height - canvasOffset;
    return [
      [minX, minY],
      [maxX, canvasOffset],
      [maxX, maxY],
      [minX, maxY]
    ];
  };

  getTriangleArea = ([[x1, y1], [x2, y2], [x3, y3]]: Triangle): number =>
    (x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2;

  getRandomTrianglePoint = ([[x1, y1], [x2, y2], [x3, y3]]: Triangle): Vector => {
    const random1 = Math.random();
    const random2 = Math.random();
    const sqrtR = Math.sqrt(random1);
    const A = 1 - sqrtR;
    const B = sqrtR * (1 - random2);
    const C = sqrtR * random2;
    const x = A * x1 + B * x2 + C * x3;
    const y = A * y1 + B * y2 + C * y3;
    return new Vector(x, y);
  };

  generateDistribution(triangles: Triangle[]) {
    const totalArea = triangles.reduce((sum, triangle) => sum + this.getTriangleArea(triangle), 0);
    const cumulativeDistribution: number[] = [];

    for (let i = 0; i < triangles.length; i++) {
      const lastValue = cumulativeDistribution[i - 1] || 0;
      const nextValue = lastValue + this.getTriangleArea(triangles[i]) / totalArea;
      cumulativeDistribution.push(nextValue);
    }
    return cumulativeDistribution;
  }

  getRandomPolygonPoint = () => {
    const randomTriangle = this.selectRandomTriangle();
    const randomPoint = this.getRandomTrianglePoint(randomTriangle);
    return randomPoint;
  };

  getRandomLightingSegment = () => {
    const randomStartPoint = this.getRandomPolygonPoint();
    const randomEndPoint = this.getRandomPolygonPoint();
    const distance = Math.sqrt(
      Math.pow(randomStartPoint.x - randomEndPoint.x, 2) + Math.pow(randomStartPoint.y - randomEndPoint.y, 2)
    );
    if (distance > MAX_LIGHTING_DISTANCE) {
      const diff = randomEndPoint.subtract(randomStartPoint);
      const unitVector = diff.normalize();
      return [randomStartPoint, unitVector.multiply(MAX_LIGHTING_DISTANCE).add(randomStartPoint)];
    }
    return [randomStartPoint, randomEndPoint];
  };

  selectRandomTriangle = () => {
    const rnd = Math.random();
    const index = this.distribution.findIndex(v => v > rnd);
    return this.triangles[index];
  };

  update = () => {
    this.updateLighting();
    this.generateLighting();
  };

  generateLighting = () => {
    if (this.group.length < MAX_LIGHTINGS) {
      const [start, end] = this.getRandomLightingSegment();
      const lighting = new Lighting(this.context, start.x, start.y, end.x, end.y);
      lighting.init();
      this.group.push(lighting);
    }
  };

  updateLighting = () => {
    this.group = this.group.filter(lighting => lighting.isPlaying());
    this.group.forEach(lighting => lighting.update());
  };

  destroy = () => this.group.forEach(lighting => lighting.destroy());
}

export { LightingGroup };

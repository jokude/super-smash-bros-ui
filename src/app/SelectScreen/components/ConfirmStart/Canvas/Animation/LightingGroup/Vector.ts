class Vector {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  getDirection = () => Math.atan2(this.y, this.x);

  getMagnitude = () => Math.sqrt(this.x * this.x + this.y * this.y);

  add = (vector: Vector) => new Vector(this.x + vector.x, this.y + vector.y);

  subtract = (vector: Vector) => new Vector(this.x - vector.x, this.y - vector.y);

  multiply = (scalar: number) => new Vector(this.x * scalar, this.y * scalar);

  normalize = () => {
    const magnitude = this.getMagnitude();
    return new Vector(this.x / magnitude, this.y / magnitude);
  };
}

export { Vector };

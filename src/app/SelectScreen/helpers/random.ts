export const getRandomNumberInRange = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min)) + min;

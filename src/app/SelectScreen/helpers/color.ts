import { CharacterColor } from '../model';

type ColorFunction = (currentColor: CharacterColor) => CharacterColor;

export const getNextColor: ColorFunction = currentColor =>
  currentColor === CharacterColor.Color8 ? CharacterColor.Color1 : currentColor + 1;

export const getPreviousColor: ColorFunction = currentColor =>
  currentColor === CharacterColor.Color1 ? CharacterColor.Color8 : currentColor - 1;

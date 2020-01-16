import { Character, CharacterColor } from '../../model';

export const getCharacterCallSound = (character?: Character, color?: CharacterColor) => {
  if (character !== undefined && color !== undefined) {
    const soundPath = character.getCharacterCall(color);
    const sound = new Audio(soundPath);
    sound.volume = 0.5;
    sound.play();
  }
};

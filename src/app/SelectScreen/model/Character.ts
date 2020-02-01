import { CharacterProperties, CharacterColor, CharacterImage } from './types';
import { getAsset } from '../helpers/assets';

export class Character {
  public id: string;
  public name: string | string[];
  public series: string;

  constructor({ id, name, series }: CharacterProperties) {
    this.id = id;
    this.name = name;
    this.series = series;
  }

  getName(color: CharacterColor = CharacterColor.Color1): string {
    return Array.isArray(this.name) ? this.name[color] : this.name;
  }

  getImage(type: CharacterImage, color: CharacterColor): string {
    if (this.isRandom()) {
      return getAsset('assets/images/random');
    }
    return getAsset(`assets/images/fighter-portraits/${this.id}/${type}_${color}`);
  }

  getIcons(): string {
    return getAsset(`assets/images/fighter-portraits/${this.id}/icons.png`);
  }

  getSeriesIcon(): string {
    return getAsset(`assets/images/series-icons/${this.series}.svg`);
  }

  getCharacterCall(color: CharacterColor = CharacterColor.Color1): string {
    const soundId =
      Array.isArray(this.name) && color !== CharacterColor.Color1 ? this.name[color].toLowerCase() : this.id;
    return getAsset(`assets/sounds/character-call/${soundId}.wav`);
  }

  isRandom(): boolean {
    return this.id === 'random';
  }
}

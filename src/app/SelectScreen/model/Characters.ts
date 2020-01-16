import { Character } from './Character';
import { CharacterProperties } from './types';

export class Characters {
  public characters: Character[];

  constructor(characterProperties: CharacterProperties[]) {
    this.characters = characterProperties.map(properties => new Character(properties));
  }

  getAll() {
    return this.characters;
  }
}

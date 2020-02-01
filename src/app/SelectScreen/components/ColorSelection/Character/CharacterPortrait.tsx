import * as React from 'react';

import styles from './styles.scss';
import { Character, CharacterColor, CharacterImage } from '../../../model';
import { Picture } from '../../Picture';

export interface CharacterPortraitProps {
  character: Character;
  color: CharacterColor;
}

export const CharacterPortrait: React.FC<CharacterPortraitProps> = ({ character, color }) => {
  const name = character.getName(color);
  const portrait = character.getImage(CharacterImage.SMALL, color);
  return (
    <div className={styles.container}>
      <Picture alt={`${name} small portrait`} className={styles.portrait} src={portrait} width="100%" height="auto" />
    </div>
  );
};

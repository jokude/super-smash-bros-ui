import * as React from 'react';
import cx from 'classnames';

import styles from './styles.scss';
import { Character, CharacterColor, CharacterImage } from '../../../model';
import { Picture } from '../../Picture';

export interface CharacterPortraitProps {
  character?: Character;
  color?: CharacterColor;
  slideClass: string;
  isSelected: boolean;
}

export const CharacterPortrait: React.FC<CharacterPortraitProps> = ({ character, color, slideClass, isSelected }) => {
  const name = character.getName(color);
  const portrait = character.getImage(CharacterImage.SMALL, color);
  const isRandom = character.isRandom();
  return (
    <div className={cx(styles.container, { [styles.selected]: isSelected })}>
      <h2 className={cx(styles.title, { [styles.large]: name.length <= 12 })}>{name}</h2>
      <div className={slideClass}>
        <Picture
          alt={`${name} small portrait`}
          className={cx(styles.portrait, { [styles.selected]: isSelected })}
          src={portrait}
          width={isRandom ? 'auto' : '100%'}
          height={isRandom ? '200px' : 'auto'}
        />
        {isSelected && !isRandom && (
          <Picture
            alt={`${name} small portrait shadow`}
            className={styles.portraitShadow}
            src={portrait}
            width="100%"
            height="auto"
          />
        )}
      </div>
      {!isRandom && (
        <img
          alt={`${name} character series`}
          className={styles.seriesIcon}
          src={character.getSeriesIcon()}
          width="120px"
          height="120px"
        />
      )}
    </div>
  );
};

CharacterPortrait.displayName = 'CharacterPortrait';

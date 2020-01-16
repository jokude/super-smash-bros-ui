import * as React from 'react';
import cx from 'classnames';

import styles from './styles.scss';
import { Character, CharacterColor, CharacterImage } from '../../../model';

export interface ColorListProps {
  character: Character;
  highlightedColor: CharacterColor;
  onColorSelect: (color?: CharacterColor) => void;
}

const totalColors = 8;
const colorIndex = [...Array(totalColors).keys()];

export const ColorList: React.FC<ColorListProps> = ({ character, highlightedColor, onColorSelect }) => (
  <div className={styles.container}>
    {colorIndex.map(index => (
      <img
        alt={`${character.getName(index)} icon ${index}`}
        className={cx(styles.icon, { [styles.highlighted]: highlightedColor === index })}
        src={character.getImage(CharacterImage.ICON, index)}
        onClick={() => onColorSelect(index)}
        width="40px"
        height="40px"
        key={index}
      />
    ))}
    <h3 className={styles.colorLabel}></h3>
  </div>
);

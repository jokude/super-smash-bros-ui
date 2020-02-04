import * as React from 'react';
import cx from 'classnames';

import styles from './styles.scss';
import { Character, CharacterColor } from '../../../model';

export interface ColorListProps {
  character: Character;
  highlightedColor: CharacterColor;
  onColorSelect: (color?: CharacterColor) => void;
}

const iconSize = styles.iconSize;
const totalColors = 8;
const colorIndex = [...Array(totalColors).keys()];

const getIconFromSpritesheet = (color: CharacterColor, path: string): React.CSSProperties => ({
  background: `url(${path}) -${(color % 3) * iconSize}px -${Math.floor(color / 3) * iconSize}px no-repeat`
});

export const ColorList: React.FC<ColorListProps> = ({ character, highlightedColor, onColorSelect }) => {
  const iconsPath = character.getIcons();
  return (
    <div className={styles.container}>
      {colorIndex.map(index => (
        <div
          className={cx(styles.iconBorder, { [styles.highlighted]: highlightedColor === index })}
          onClick={() => onColorSelect(index)}
          key={index}
        >
          <div className={cx(styles.icon)} style={getIconFromSpritesheet(index, iconsPath)} />
        </div>
      ))}
      <h3 className={styles.colorLabel}></h3>
    </div>
  );
};

ColorList.displayName = 'ColorList';

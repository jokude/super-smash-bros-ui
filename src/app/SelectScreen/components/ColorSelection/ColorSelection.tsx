import * as React from 'react';

import { CharacterPortrait } from './Character';
import { ColorList } from './ColorList';
import { ColorLabel } from './ColorLabel';
import { CharacterColor, Character } from '../../model';
import { useKeypresses } from '../../hooks';
import { getNextColor, getPreviousColor, cursorSound, acceptSound, selectCharacterSound } from '../../helpers';
import styles from './styles.scss';

export interface ColorSelectionProps {
  character: Character;
  initialColor: CharacterColor;
  onColorSelect: (color?: CharacterColor) => void;
  onClose: () => void;
}

export const ColorSelection: React.FC<ColorSelectionProps> = ({ character, initialColor, onColorSelect, onClose }) => {
  const [color, setColor] = React.useState<CharacterColor>(initialColor);
  useKeypresses(true, [
    {
      pressCallback: () => {
        cursorSound.play();
        setColor(getPreviousColor(color));
      },
      key: 'left'
    },
    {
      pressCallback: () => {
        cursorSound.play();
        setColor(getNextColor(color));
      },
      key: 'right'
    },
    {
      pressCallback: () => {
        acceptSound.play();
        selectCharacterSound.play();
        onColorSelect(color);
      },
      key: 'enter'
    },
    {
      pressCallback: () => {
        selectCharacterSound.play();
        onClose();
      },
      key: 'esc'
    }
  ]);
  return (
    <div className={styles.container}>
      <CharacterPortrait character={character} color={color} />
      <div className={styles.bottomContainer}>
        <ColorList character={character} highlightedColor={color} onColorSelect={onColorSelect} />
        <ColorLabel color={color} />
      </div>
    </div>
  );
};

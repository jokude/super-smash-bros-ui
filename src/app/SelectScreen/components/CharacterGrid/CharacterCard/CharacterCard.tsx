import * as React from 'react';
import cx from 'classnames';

import styles from './styles.scss';
import { Character, CharacterImage } from '../../../model';
import { cursorSound, selectCharacterSound } from '../../../helpers';

export interface CharacterProps {
  character: Character;
  onHightlight: (character?: Character) => void;
  onSelect: () => void;
  onColorChange: () => void;
}

const onClickHandler = (callback: () => void): React.MouseEventHandler => () => {
  selectCharacterSound.play();
  callback();
};

const onMouseEnter = (callback: () => void): React.MouseEventHandler => () => {
  cursorSound.play();
  callback();
};

const onMouseLeave = (callback: () => void): React.MouseEventHandler => evt => {
  evt.persist();
  const isLeavingSiblingGroup = evt.currentTarget.parentNode === evt.relatedTarget;
  if (isLeavingSiblingGroup) {
    cursorSound.play();
    callback();
  }
};

const onContextMenu = (callback: () => void): React.MouseEventHandler => evt => {
  evt.preventDefault();
  callback();
};

export const CharacterCard: React.FC<CharacterProps> = ({ character, onHightlight, onColorChange, onSelect }) => {
  const charName = character.getName();
  const isRandom = character.isRandom();
  return (
    <div
      className={styles.card}
      onClick={onClickHandler(onSelect)}
      onContextMenu={onContextMenu(onColorChange)}
      onMouseEnter={onMouseEnter(() => onHightlight(character))}
      onMouseLeave={onMouseLeave(() => onHightlight())}
    >
      <img
        alt={`${charName} half portrait`}
        className={cx({ [styles.cardPortrait]: !isRandom, [styles.cardPortraitRandom]: isRandom })}
        src={character.getImage(CharacterImage.HALF, 0)}
        height="100%"
        width="auto"
      />
      {!isRandom && <div className={styles.cardTitle}>{charName}</div>}
    </div>
  );
};

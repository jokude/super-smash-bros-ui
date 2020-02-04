import * as React from 'react';
import cx from 'classnames';

import { CharacterCard } from './CharacterCard';
import { Characters, Character } from '../../model';
import styles from './styles.scss';

export interface CharacterGridProps {
  characters: Characters;
  enabledEvents: boolean;
  onHighlight: (character?: Character) => void;
  onSelect: () => void;
  onColorChange: () => void;
}

export const CharacterGrid: React.FC<CharacterGridProps> = ({
  characters,
  onHighlight,
  onSelect,
  onColorChange,
  enabledEvents
}) => (
  <div className={cx(styles.grid, { [styles.disabled]: !enabledEvents })}>
    {characters.getAll().map((character: Character) => (
      <CharacterCard
        key={character.id}
        character={character}
        onHightlight={enabledEvents ? onHighlight : undefined}
        onColorChange={enabledEvents ? onColorChange : undefined}
        onSelect={onSelect}
      />
    ))}
  </div>
);

CharacterGrid.displayName = 'CharacterGrid';

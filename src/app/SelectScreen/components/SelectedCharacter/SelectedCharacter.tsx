import * as React from 'react';

import { Container } from './Container';
import { Slide } from './Slide';
import { CharacterPortrait, CharacterPortraitProps } from './Character';

export interface SelectedCharacterProps extends Pick<CharacterPortraitProps, 'character' | 'color'> {
  isSelected: boolean;
  enabledEvents: boolean;
  onSelect: () => void;
  onColorChange: () => void;
}

export const SelectedCharacter: React.FC<SelectedCharacterProps> = ({
  character,
  color,
  isSelected,
  onSelect,
  onColorChange,
  enabledEvents
}) => {
  const enabled = enabledEvents && !!character && !character.isRandom();
  return (
    <Container
      isSelected={isSelected}
      onClick={enabled ? onSelect : undefined}
      onContextMenu={enabled ? onColorChange : undefined}
    >
      <Slide childKey={character ? character.id : ''}>
        {slideClass =>
          character && (
            <CharacterPortrait character={character} color={color} slideClass={slideClass} isSelected={isSelected} />
          )
        }
      </Slide>
    </Container>
  );
};

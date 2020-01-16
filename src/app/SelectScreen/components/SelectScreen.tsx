import * as React from 'react';

import { characters } from '../../data/characters.json';
import { Title } from './Title';
import { CharacterGrid } from './CharacterGrid';
import { SelectedContainer } from './SelectedContainer';
import { SelectedCharacter } from './SelectedCharacter';
import { ColorSelection } from './ColorSelection';
import { ConfirmStart } from './ConfirmStart';
import { useSelectedCharacter } from '../hooks';
import { Characters } from '../model';
import { getNextColor, getCharacterCallSound } from '../helpers';
import styles from './styles.scss';

const collection = new Characters(characters);

export const SelectScreen: React.FC = () => {
  const {
    state: { hightlightedCharacter, selectedCharacterColor, isSelectingCharacter, isConfirming, isSelectingColor },
    actions: { hightlightCharacter, selectCharacterColor, toggleConfirming, toggleColorSelection }
  } = useSelectedCharacter();
  return (
    <div className={styles.screenContainer}>
      <div className={styles.screenContainerInner}>
        <Title title="Training" />
        <div className={styles.container}>
          <CharacterGrid
            characters={collection}
            onHighlight={hightlightCharacter}
            onSelect={() => {
              toggleConfirming(true);
              if (hightlightedCharacter && !hightlightedCharacter.isRandom()) {
                getCharacterCallSound(hightlightedCharacter, selectedCharacterColor);
              }
            }}
            onColorChange={() => selectCharacterColor(getNextColor(selectedCharacterColor))}
            enabledEvents={isSelectingCharacter}
          />
          <SelectedContainer>
            {isSelectingColor && (
              <ColorSelection
                character={hightlightedCharacter}
                initialColor={selectedCharacterColor}
                onColorSelect={color => {
                  selectCharacterColor(color);
                  toggleColorSelection(false);
                }}
                onClose={() => toggleColorSelection(false)}
              />
            )}
            <SelectedCharacter
              character={hightlightedCharacter}
              color={selectedCharacterColor}
              isSelected={isConfirming}
              onSelect={() => toggleColorSelection(true)}
              onColorChange={() => selectCharacterColor(getNextColor(selectedCharacterColor))}
              enabledEvents={isConfirming}
            />
          </SelectedContainer>
        </div>
        <ConfirmStart active={isConfirming} onEscape={() => toggleConfirming(false)} />
      </div>
    </div>
  );
};

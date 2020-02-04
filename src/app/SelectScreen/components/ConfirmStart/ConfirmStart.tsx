import * as React from 'react';
import { Transition } from 'react-transition-group';

import { Backdrop } from './Backdrop';
import { TextContainer } from './TextContainer';
import { ConfirmText } from './ConfirmText';
import { Canvas } from './Canvas';
import { useKeypresses } from '../../hooks';
import { cancelSelectCharacterSound } from '../../helpers';
import styles from './styles.scss';

export interface ConfirmStartProps {
  active: boolean;
  onEscape: () => void;
}

const width = 1280;
const height = 300;

export const ConfirmStart: React.FC<ConfirmStartProps> = ({ active, onEscape }) => {
  useKeypresses(active, [
    {
      pressCallback: () => {
        cancelSelectCharacterSound.play();
        onEscape();
      },
      key: 'esc'
    }
  ]);
  return (
    <Transition in={active} timeout={parseInt(styles.animationDuration, 10)}>
      {status => (
        <>
          <Backdrop status={status} />
          <TextContainer active={active}>
            <ConfirmText status={status} />
            <Canvas width={width} height={height} enabled={active} />
          </TextContainer>
        </>
      )}
    </Transition>
  );
};

ConfirmStart.displayName = 'ConfirmStart';

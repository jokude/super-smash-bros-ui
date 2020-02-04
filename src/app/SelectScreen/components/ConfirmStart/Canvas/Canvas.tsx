import * as React from 'react';

import { CanvasAnimation } from './Animation';
import styles from './styles.scss';
import animationStyles from '../styles.scss';

interface CanvasProps {
  width: number;
  height: number;
  enabled: boolean;
}

const ANIMATION_DURATION = parseInt(animationStyles.animationDuration, 10) * 5;

const animateEffect = (
  canvasRef: React.MutableRefObject<HTMLCanvasElement>,
  enabled: boolean
): React.EffectCallback => () => {
  if (enabled) {
    const animation = new CanvasAnimation(canvasRef.current, ANIMATION_DURATION);
    animation.init();
    return () => animation.stop();
  }
  return undefined;
};

export const Canvas: React.FC<CanvasProps> = ({ width, height, enabled }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>();
  React.useEffect(animateEffect(canvasRef, enabled), [enabled, canvasRef]);
  return <canvas ref={canvasRef} className={styles.canvas} width={width} height={height} />;
};

Canvas.displayName = 'ConfirmStartCanvas';

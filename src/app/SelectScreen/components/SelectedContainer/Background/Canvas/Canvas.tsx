import * as React from 'react';

import { CanvasAnimation } from './Animation';
import styles from './styles.scss';

interface CanvasProps {
  width: number;
  height: number;
}

const animateEffect = (canvasRef: React.MutableRefObject<HTMLCanvasElement>): React.EffectCallback => () => {
  const animation = new CanvasAnimation(canvasRef.current);
  animation.init();
  return () => animation.stop();
};

export const Canvas: React.FC<CanvasProps> = ({ width, height }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>();
  React.useEffect(animateEffect(canvasRef), [canvasRef]);
  return <canvas ref={canvasRef} className={styles.canvas} width={width} height={height} />;
};

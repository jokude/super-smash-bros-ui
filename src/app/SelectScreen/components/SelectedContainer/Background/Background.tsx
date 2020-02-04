import * as React from 'react';

import { Canvas } from './Canvas';
import styles from './styles.scss';

export const Background: React.FC = () => (
  <div className={styles.background}>
    <Canvas width={1280} height={300} />
  </div>
);

Background.displayName = 'Background';

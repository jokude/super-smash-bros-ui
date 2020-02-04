import * as React from 'react';

import styles from './styles.scss';
import { CharacterColor } from '../../../model';

export interface ColorLabelProps {
  color: CharacterColor;
}

export const ColorLabel: React.FC<ColorLabelProps> = ({ color }) => (
  <h3 className={styles.colorLabel}>{`Color ${color}`}</h3>
);

ColorLabel.displayName = 'ColorLabel';

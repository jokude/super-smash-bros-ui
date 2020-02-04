import * as React from 'react';
import cx from 'classnames';

import styles from './styles.scss';

export interface BackdropProps {
  status: string;
}

export const Backdrop: React.FC<BackdropProps> = ({ status, children }) => (
  <div className={cx(styles.backdrop, styles[status])}>{children}</div>
);

Backdrop.displayName = 'Backdrop';

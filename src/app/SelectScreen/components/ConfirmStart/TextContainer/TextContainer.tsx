import * as React from 'react';
import cx from 'classnames';

import styles from './styles.scss';
import { cursorSound } from '../../../helpers';

const onMouseEnter: React.MouseEventHandler = () => cursorSound.play();

export interface TextContainerProps {
  active: boolean;
}

export const TextContainer: React.FC<TextContainerProps> = ({ children, active }) => (
  <div className={cx(styles.container, { [styles.disabled]: !active })} onMouseEnter={onMouseEnter}>
    {children}
  </div>
);

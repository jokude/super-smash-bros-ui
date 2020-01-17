import * as React from 'react';
import SVG from 'react-inlinesvg';
import cx from 'classnames';

import { cursorSound, getAsset } from '../../../helpers';
import styles from './styles.scss';

interface ContainerProps {
  isSelected: boolean;
  onClick?: () => void;
  onContextMenu?: () => void;
}

const onMouseEnter: React.MouseEventHandler = () => cursorSound.play();
const onClickHandler = (callback: () => void): React.MouseEventHandler => () => {
  cursorSound.play();
  callback();
};

const onContextMenuHandler = (callback: () => void): React.MouseEventHandler => evt => {
  evt.preventDefault();
  callback();
};

export const Container: React.FC<ContainerProps> = ({ children, isSelected, onClick, onContextMenu }) => (
  <div
    onClick={onClick ? onClickHandler(onClick) : undefined}
    onContextMenu={onContextMenu ? onContextMenuHandler(onContextMenu) : undefined}
    onMouseEnter={isSelected ? onMouseEnter : undefined}
    className={cx(styles.container, { [styles.selected]: isSelected })}
  >
    <SVG src={getAsset('assets/images/characterBackground.svg')} className={styles.background} />
    {children}
  </div>
);

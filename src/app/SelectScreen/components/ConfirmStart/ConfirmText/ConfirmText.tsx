import * as React from 'react';
import SVG from 'react-inlinesvg';
import cx from 'classnames';

import { getAsset } from '../../../helpers/assets';
import styles from './styles.scss';

export interface ConfirmTextProps {
  status: string;
}

export const ConfirmText: React.FC<ConfirmTextProps> = ({ status }) => (
  <div className={styles.container}>
    <SVG
      src={getAsset('assets/images/readyToFight.svg')}
      className={cx(styles.text, styles[status])}
      width="100%"
      height="100%"
    />
  </div>
);

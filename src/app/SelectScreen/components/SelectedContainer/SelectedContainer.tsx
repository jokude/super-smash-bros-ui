import * as React from 'react';

import { Background } from './Background';
import styles from './styles.scss';

export const SelectedContainer: React.FC = ({ children }) => (
  <div className={styles.selectedContainer}>
    <Background />
    <div className={styles.childrenContainer}>
      <div className={styles.childrenItem}>
        {React.Children.map(children, (child, index) => (
          <div className={styles.childrenItemAbsolute} key={index}>
            {child}
          </div>
        ))}
      </div>
    </div>
  </div>
);

import * as React from 'react';
import styles from './styles.scss';

export interface TitleProps {
  title: string;
}

export const Title: React.FC<TitleProps> = ({ title }) => (
  <div className={styles.titleTabContainer}>
    <div className={styles.titleTab} />
    <h1 className={styles.title}>{title}</h1>
  </div>
);

Title.displayName = 'Title';

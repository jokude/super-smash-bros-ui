import * as React from 'react';
import { TransitionGroup, Transition } from 'react-transition-group';
import cx from 'classnames';

import styles from './styles.scss';

export interface SlideProps {
  childKey: string;
  children: (slideClass: string) => React.ReactNode;
}

const SLIDE_DURATION = parseInt(styles.slideDuration, 10);

export const Slide: React.FC<SlideProps> = ({ children, childKey }) => (
  <TransitionGroup component={null}>
    <Transition key={childKey} timeout={SLIDE_DURATION}>
      {state => children(cx(styles.slide, styles[state]))}
    </Transition>
  </TransitionGroup>
);

Slide.displayName = 'Slide';

import * as React from 'react';
import { SelectScreen } from './SelectScreen';

if (process.env.NODE_ENV === 'development') {
  import('./styles/base.scss');
}

export const App: React.FC = () => <SelectScreen />;

App.displayName = 'MainApp';

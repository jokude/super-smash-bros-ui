import { useEffect, EffectCallback } from 'react';
import keycode from 'keycode';

interface KeyOption {
  pressCallback: () => void;
  key: KeyboardEvent['key'];
}

const handleUserKeyPress = (options: KeyOption[]) => (event: KeyboardEvent) => {
  const keyCode = keycode(event);
  const pressedOption = options.find(option => option.key === keyCode);
  if (Boolean(pressedOption)) {
    pressedOption.pressCallback();
  }
};

const handleKeyEffect = (enabled: boolean, options: KeyOption[]): EffectCallback => () => {
  if (enabled) {
    const onUserKeyPress = handleUserKeyPress(options);
    window.addEventListener('keydown', onUserKeyPress);
    return () => window.removeEventListener('keydown', onUserKeyPress);
  }
  return undefined;
};

export const useKeypresses = (enabled: boolean, options: KeyOption[]) =>
  useEffect(handleKeyEffect(enabled, options), [enabled, options]);

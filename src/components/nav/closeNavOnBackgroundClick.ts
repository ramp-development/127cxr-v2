import { simulateEvent } from '@finsweet/ts-utils';

import type { NavObject } from './navObject';

export const closeNavOnBackgroundClick = (config: NavObject) => {
  const { button, background } = config;
  if (!button || !background) return;

  background.addEventListener('click', () => {
    simulateEvent(button, 'click');
  });
};

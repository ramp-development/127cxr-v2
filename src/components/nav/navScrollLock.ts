import { controlScroll } from '$utils/controlScroll';

import type { NavObject } from './navObject';

export const navScrollLock = (config: NavObject) => {
  // eslint-disable-next-line no-console
  console.log('navScrollLock');

  const { wOverlay } = config;
  if (!wOverlay) return;

  // mutation observer to detect when the slider has style attributes changed
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type !== 'attributes' && mutation.attributeName !== 'style') return;

      const target = mutation.target as HTMLDivElement;
      if (target.style.display === 'none') {
        controlScroll('enable');
      } else {
        controlScroll('disable');
      }
    });
  });

  observer.observe(wOverlay, { attributes: true });
};

import { queryElement } from '$utils/queryElement';

import { closeNavOnBackgroundClick } from './closeNavOnBackgroundClick';
import { hideAndShowNav } from './hideAndShowNav';
import type { NavObject } from './navObject';
import { navScrollLock } from './navScrollLock';
import { triggerNavModals } from './triggerNavModals';

export const nav = () => {
  // eslint-disable-next-line no-console
  console.log('nav');

  /**
   * 1. hide/show nav on load/scroll?
   * 2. body scroll lock/unlock on open/close
   * 3. close nav when background clicked
   * 4. open contact/download modal from buttons
   */

  const attr = 'data-nav';
  const component = queryElement<HTMLDivElement>(`[${attr}="component"]`);
  if (!component) return;

  const config: NavObject = {
    attr,
    component,
    wOverlay: queryElement<HTMLDivElement>('.w-nav-overlay', component),
    button: queryElement<HTMLDivElement>(`[${attr}="button"]`, component),
    background: queryElement<HTMLDivElement>(`[${attr}="background"]`, component),
  };

  hideAndShowNav(config);
  navScrollLock(config);
  closeNavOnBackgroundClick(config);
  triggerNavModals(config);
};

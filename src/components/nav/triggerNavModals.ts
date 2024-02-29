import { simulateEvent } from '@finsweet/ts-utils';

import { queryElement } from '$utils/queryElement';
import { queryElements } from '$utils/queryElements';

import type { NavObject } from './navObject';

export const triggerNavModals = (config: NavObject) => {
  // data-nav-trigger="contact" and data-nav-trigger="download"
  const triggerAttr = 'data-nav-trigger';
  const buttonAttr = 'data-nav-button';
  const { component, button } = config;
  if (!component || !button) return;

  const downloadsButton = queryElement<HTMLDivElement>(`[${buttonAttr}="downloads"]`, component);
  const contactButton = queryElement<HTMLDivElement>(`[${buttonAttr}="contact"]`, component);

  const triggers = queryElements<HTMLDivElement>(`[${triggerAttr}]`);
  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      simulateEvent(button, 'click');

      const triggerType = trigger.getAttribute(triggerAttr);
      switch (triggerType) {
        case 'downloads':
          if (downloadsButton) simulateEvent(downloadsButton, 'click');
          break;
        case 'contact':
          if (contactButton) simulateEvent(contactButton, 'click');
          break;
        default:
          break;
      }
    });
  });
};

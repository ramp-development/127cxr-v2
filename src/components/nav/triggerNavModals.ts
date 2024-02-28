import { simulateEvent } from '@finsweet/ts-utils';

import { queryElement } from '$utils/queryElement';
import { queryElements } from '$utils/queryElements';

import type { NavObject } from './navObject';

export const triggerNavModals = (config: NavObject) => {
  // eslint-disable-next-line no-console
  console.log('triggerNavModals');

  // data-nav-trigger="contact" and data-nav-trigger="download"
  const triggerAttr = 'data-nav-trigger';
  const buttonAttr = 'data-nav-button';
  const { component, button } = config;
  if (!component || !button) return;

  const downloadsButton = queryElement<HTMLDivElement>(`[${buttonAttr}="downloads"]`, component);
  const contactButton = queryElement<HTMLDivElement>(`[${buttonAttr}="contact"]`, component);

  console.log(downloadsButton);
  console.log(contactButton);

  const triggers = queryElements<HTMLDivElement>(`[${triggerAttr}]`);
  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      simulateEvent(button, 'click');

      const triggerType = trigger.getAttribute(triggerAttr);
      switch (triggerType) {
        case 'downloads':
          if (downloadsButton) {
            console.log('downloadsButton');
            simulateEvent(downloadsButton, 'click');
          }
          break;
        case 'contact':
          if (contactButton) {
            console.log('contactButton');
            simulateEvent(contactButton, 'click');
          }
          break;
        default:
          break;
      }
    });
  });
};

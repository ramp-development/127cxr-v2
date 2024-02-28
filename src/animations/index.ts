import { background } from './background';
import { chevrons } from './chevrons';
import { smoothScroll } from './smootScroll';

export const animations = () => {
  // eslint-disable-next-line no-console
  console.log('animations');
  smoothScroll();
  background();
  chevrons();
};

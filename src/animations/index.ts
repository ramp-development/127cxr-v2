import { background } from './background';
import { chevrons } from './chevrons';
import { smoothScroll } from './smootScroll';

export const animations = () => {
  console.log('animations');
  smoothScroll();
  background();
  chevrons();
};

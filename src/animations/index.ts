import { background } from './background';
import { chevrons } from './chevrons';
import { smoothScroll } from './smootScroll';

export const animations = () => {
  smoothScroll();
  background();
  chevrons();
};

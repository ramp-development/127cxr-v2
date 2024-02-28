import { elevation } from './elevation';
import { nav } from './nav';
import { refreshScrollTrigger } from './refreshScrollTrigger';

export const components = () => {
  // eslint-disable-next-line no-console
  console.log('components');

  nav();
  elevation();
  refreshScrollTrigger();
};

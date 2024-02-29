import { elevation } from './elevation';
import { nav } from './nav';
import { refreshScrollTrigger } from './refreshScrollTrigger';

export const components = () => {
  nav();
  elevation();
  refreshScrollTrigger();
};

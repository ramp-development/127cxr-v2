import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { animations } from './animations';
import { components } from './components';

declare global {
  interface WindowEventMap {
    controlScroll: CustomEvent;
  }
}

window.Webflow ||= [];
window.Webflow.push(() => {
  gsap.registerPlugin(ScrollTrigger);
  animations();
  components();
});

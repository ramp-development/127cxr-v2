import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { animations } from './animations';
import { components } from './components';

window.Webflow ||= [];
window.Webflow.push(() => {
  gsap.registerPlugin(ScrollTrigger);
  animations();
  components();
});

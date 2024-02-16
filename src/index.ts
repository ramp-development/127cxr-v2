import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { animations } from './animations';

window.Webflow ||= [];
window.Webflow.push(() => {
  gsap.registerPlugin(ScrollTrigger);
  animations();
});

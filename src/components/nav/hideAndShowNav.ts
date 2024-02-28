import gsap from 'gsap';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { queryElement } from '$utils/queryElement';

import type { NavObject } from './navObject';

export const hideAndShowNav = (config: NavObject) => {
  // eslint-disable-next-line no-console
  console.log('hideAndShowNav');

  const { component } = config;
  const fullHero = queryElement<HTMLDivElement>('.full-hero');

  // define the timeline and animation
  const timeline = gsap
    .timeline({
      defaults: {
        duration: 0.5,
        ease: 'power2.inOut',
      },
    })
    .to(component, { yPercent: 100 });

  if (!!fullHero) {
    ScrollTrigger.create({
      animation: timeline,
      trigger: fullHero,
      start: 'bottom top',
      scrub: false,
      toggleActions: 'none play none reverse',
    });
  } else {
    timeline.play();
  }
};

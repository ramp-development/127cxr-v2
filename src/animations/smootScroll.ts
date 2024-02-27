import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const smoothScroll = () => {
  console.log('smoothScroll');

  const lenis = new Lenis();

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  window.addEventListener('controlScroll', (event: CustomEvent) => {
    switch (event.detail.instruction) {
      case 'enable':
        lenis.start();
        break;
      case 'disable':
        lenis.stop();
        break;
      case 'toggle':
        switch (lenis.isStopped()) {
          case true:
            lenis.start();
            break;
          case false:
            lenis.stop();
            break;
        }
        break;
    }
  });
};

import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { queryElements } from '$utils/queryElements';

export const refreshScrollTrigger = () => {
  console.log('refreshScrollTrigger');

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type !== 'attributes' && mutation.attributeName !== 'style') return;
      ScrollTrigger.refresh();
    });
  });

  const elements = queryElements<HTMLDivElement>('[data-on-change="refresh-scrollTrigger"]');
  elements.forEach((element) => {
    observer.observe(element, { attributes: true });
  });
};

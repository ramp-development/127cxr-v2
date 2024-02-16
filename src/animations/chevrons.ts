import gsap from 'gsap';

import { queryElements } from '$utils/queryElements';

export const chevrons = () => {
  console.log('chevrons');

  const chevronWrappers = queryElements<HTMLDivElement>('.chevrons_wrapper');
  chevronWrappers.forEach((chevronWrapper) => {
    const isRight = [...chevronWrapper.classList].some((item) => item.includes('right'));
    let paths = queryElements<SVGPathElement>('path', chevronWrapper);
    if (!isRight) paths = paths.reverse();

    const timeline = gsap.timeline({
      defaults: { duration: 1, stagger: 0.05, ease: 'power2.inOut' },
      scrollTrigger: {
        trigger: chevronWrapper,
        start: 'top 75%',
        scrub: false,
      },
    });

    timeline.from(paths, { x: isRight ? 64 : -64, opacity: 0, stagger: 0.1 });
  });
};

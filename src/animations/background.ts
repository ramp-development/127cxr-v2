import gsap from 'gsap';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { queryElement } from '$utils/queryElement';
import { queryElements } from '$utils/queryElements';

export const background = () => {
  console.log('background');

  // const pageWrapper = queryElement('.page-wrapper');
  // if (!pageWrapper) return;

  const propertyNames = [
    'background',
    'heading',
    'sub-heading',
    'text',
    'accent',
    'muted',
    'vborder',
    'hborder',
  ];

  // const object = {
  //   '--colors-page-wrapper--background': 'var(--colors-theme-light--background)',
  //   '--colors-page-wrapper--heading': 'var(--colors-theme-light--heading)',
  //   '--colors-page-wrapper--sub-heading': 'var(--colors-theme-light--sub-heading)',
  //   '--colors-page-wrapper--text': 'var(--colors-theme-light--text)',
  //   '--colors-page-wrapper--accent': 'var(--colors-theme-light--accent)',
  //   '--colors-page-wrapper--muted': 'var(--colors-theme-light--muted)',
  //   '--colors-page-wrapper--vborder': 'var(--colors-theme-light--vborder)',
  //   '--colors-page-wrapper--hborder': 'var(--colors-theme-light--hborder)',
  // };

  const sections = queryElements('[data-theme]');
  sections.forEach((section, index) => {
    const { theme } = section.dataset;
    if (!theme) return;

    // set the page styles immediately if we're on the first section
    if (index === 0) {
      setProperties(theme);
    }

    section.removeAttribute('data-theme');

    // create the gsap timeline
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top center',
        end: 'top 25%',
        scrub: 1,
        // markers: true,
      },
    });

    // create the properties object
    let propertiesToAnimate = {};
    propertyNames.forEach((propertyName) => {
      const value = getPropertyValue(`--colors-theme-${theme}--${propertyName}`);
      propertiesToAnimate = {
        ...propertiesToAnimate,
        [`--colors-page-wrapper--${propertyName}`]: value,
      };
    });

    // set the properties
    timeline.to(':root', propertiesToAnimate);
  });

  function setProperties(theme: string) {
    propertyNames.forEach((propertyName) => {
      const value = getPropertyValue(`--colors-theme-${theme}--${propertyName}`);
      document.documentElement.style.setProperty(`--colors-page-wrapper--${propertyName}`, value);
    });
  }

  function getPropertyValue(property: string) {
    return getComputedStyle(document.documentElement).getPropertyValue(property);
  }
};

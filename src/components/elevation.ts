import { simulateEvent } from '@finsweet/ts-utils';
import Splide from '@splidejs/splide';

import { controlScroll } from '$utils/controlScroll';
import { queryElement } from '$utils/queryElement';
import { queryElements } from '$utils/queryElements';

export const elevation = () => {
  // get the component
  const component = queryElement<HTMLDivElement>('[data-component="elevation"]');
  if (!component) return;

  // component attribute
  const attr = 'data-elevation';

  // get the floors and detail buttons
  const floors = queryElements<HTMLDivElement>(`[${attr}="floor-wireframe"]`, component);
  const detailButtons = queryElements<HTMLButtonElement>(`[${attr}="floor-button"]`, component);

  // highlight the button when the floor is hovered
  floors.forEach((floor, index) => {
    floor.addEventListener('mouseenter', () => {
      detailButtons[index].classList.add('cc-hover');
    });

    floor.addEventListener('mouseleave', () => {
      detailButtons[index].classList.remove('cc-hover');
    });

    floor.addEventListener('click', () => {
      simulateEvent(detailButtons[index], 'click');
    });
  });

  // highlight the floor when the detail button is hovered
  detailButtons.forEach((button, index) => {
    button.addEventListener('mouseenter', () => {
      floors[index].style.opacity = '1';
    });

    button.addEventListener('mouseleave', () => {
      floors[index].style.removeProperty('opacity');
    });
  });

  // get the unit switch and secondary switch
  const unitSwitch = queryElement<HTMLButtonElement>(`[${attr}="unit-switch"]`, component);
  const secondarySwitches = queryElements<HTMLButtonElement>(
    `[${attr}="secondary-switch"]`,
    component
  );

  // click the main switch when the secondary switches are clicked
  if (unitSwitch && secondarySwitches.length > 0) {
    secondarySwitches.forEach((secondarySwitch) => {
      secondarySwitch.addEventListener('click', () => {
        simulateEvent(unitSwitch, 'click');
      });
    });
  }

  // get the slider elements
  const sliderWrapper = queryElement<HTMLDivElement>(`[${attr}="slider-wrapper"]`, component);
  const sliderComponent = queryElement<HTMLDivElement>(`[${attr}="slider"]`, sliderWrapper);
  const slideIdentifiers = queryElements<HTMLDivElement>(`[data-slide-identifier]`, component);
  const arrows = queryElement<HTMLButtonElement>(`[${attr}="arrows"]`, component);
  const arrowsTargets = queryElements<HTMLButtonElement>(`[${attr}="arrows-target"]`, component);
  const paginationLinks = queryElements<HTMLButtonElement>(
    `[${attr}="pagination-link"]`,
    component
  );

  if (!sliderWrapper || !sliderComponent) return;

  // mutation observer to detect when the slider has style attributes changed
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type !== 'attributes' && mutation.attributeName !== 'style') return;
      const target = mutation.target as HTMLDivElement;
      if (target.style.display === 'none') {
        controlScroll('enable');
      } else {
        controlScroll('disable');
        setArrowsPosition();
      }
    });
  });

  observer.observe(sliderWrapper, { attributes: true });

  // initialize the slider
  const slider = new Splide(sliderComponent, {
    type: 'fade',
    pagination: false,
  }).mount();

  // go to slide index when opened
  detailButtons.forEach((button) => {
    const identifier = button.dataset.triggerIdentifier;

    const slideIndex = slideIdentifiers.findIndex(
      (slide) => slide.dataset.slideIdentifier === identifier
    );

    button.addEventListener('click', () => {
      slider.go(slideIndex);
    });
  });

  // go to slide index when pagination link is clicked
  paginationLinks.forEach((link, index) => {
    link.addEventListener('click', () => {
      slider.go(index);
    });
  });

  // highlight the pagination link when the slide is active
  slider.on('active', function () {
    paginationLinks.forEach((link, index) => {
      if (index === slider.index) {
        link.classList.add('cc-active');
      } else {
        link.classList.remove('cc-active');
      }
    });
  });

  function setArrowsPosition(): void {
    if (!arrows) return;

    const arrowsTarget = arrowsTargets[0];
    const arrowsTargetRect = arrowsTarget.getBoundingClientRect();
    arrows.style.left = `${arrowsTargetRect.left}px`;
    arrows.style.top = `${arrowsTargetRect.top}px`;
    arrows.style.width = `${arrowsTargetRect.width}px`;
    arrows.style.height = `${arrowsTargetRect.height}px`;
    arrows.style.opacity = '1';
  }
};

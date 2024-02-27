export const controlScroll = (instruction: 'enable' | 'disable' | 'toggle' = 'toggle') => {
  // create a custom event to control the scroll
  const controlScrollEvent = new CustomEvent('controlScroll', {
    detail: { instruction },
  });

  // dispatch the event
  window.dispatchEvent(controlScrollEvent);
};

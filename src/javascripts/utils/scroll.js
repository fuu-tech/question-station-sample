export const elemScroll = (containerElem, targetElem, opts = {}) => {
  const containerRect = containerElem.getBoundingClientRect();
  const targetRect = targetElem.getBoundingClientRect();
  if (
    targetRect.left < containerRect.left
    || containerRect.left + containerRect.width < targetRect.left
    || targetRect.top < containerRect.top
    || containerRect.top + containerRect.height < targetRect.top
  ) {
    containerElem.scrollBy({
      top: targetRect.top - containerRect.top,
      left: targetRect.left - containerRect.left,
      behavior: "smooth",
      ...opts
    });
  }
};

export const scrollTop = (opts = {}) => {
  window.window.scrollTo({ top: 0, left: 0, behavior: "smooth", ...opts });
};

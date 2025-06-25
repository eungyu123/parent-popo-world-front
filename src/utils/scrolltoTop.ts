export const scrollToTop = (behavior: ScrollBehavior = "instant") => {
  window.scrollTo({
    top: 0,
    behavior,
  });
};

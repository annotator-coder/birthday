const CounterAnim = (() => {
  const animated = new Set();

  function animateValue(el, from, to, duration) {
    if (animated.has(el)) return;
    animated.add(el);
    const start = performance.now();
    const update = (time) => {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(from + (to - from) * eased);
      el.textContent = current.toLocaleString('ko-KR');
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = to.toLocaleString('ko-KR');
    };
    requestAnimationFrame(update);
  }

  function init() {
    document.querySelectorAll('#numbers [data-count-to]').forEach(el => {
      animateValue(el, 0, parseFloat(el.dataset.countTo), parseInt(el.dataset.countDuration || '1800'));
    });
  }

  return { init, animateValue };
})();

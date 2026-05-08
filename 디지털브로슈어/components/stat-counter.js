// components/stat-counter.js
const StatCounter = {
  initAll() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            StatCounter._animate(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('[data-count]').forEach(el => observer.observe(el));
  },

  _animate(el) {
    const raw = el.dataset.count.replace(/[^0-9.]/g, '');
    const target = parseFloat(raw);
    if (isNaN(target)) return;

    const suffix = el.dataset.count.replace(/[0-9.,]/g, '').trim();
    const duration = 1500;
    const start = performance.now();

    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = current.toLocaleString() + (suffix ? ' ' + suffix : '');
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = el.dataset.count;
    };

    requestAnimationFrame(step);
  },
};

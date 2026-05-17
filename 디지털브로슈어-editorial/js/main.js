document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // ─── 도트 네비게이션 ────────────────────────────────
  const dotItems = document.querySelectorAll('.dot-nav-item');
  const dotNav   = document.getElementById('dot-nav');
  const lightSections = new Set(['energy']);

  dotItems.forEach(item => {
    item.addEventListener('click', () => {
      gsap.to(window, {
        scrollTo: { y: '#' + item.dataset.target, offsetY: 0 },
        duration: 1.2,
        ease: 'power3.inOut'
      });
    });
  });

  const sections = ['hero','numbers','heritage','value','energy','social','outro'];
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      dotItems.forEach(d => d.classList.toggle('active', d.dataset.target === id));
      dotNav.classList.toggle('dot-nav--light', lightSections.has(id));
    });
  }, { threshold: 0.4 });

  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) sectionObserver.observe(el);
  });

  // ─── scroll-reveal ──────────────────────────────────
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ─── 그린 스탯 진행 바 ──────────────────────────────
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.green-stat-bar').forEach(bar => bar.classList.add('animated'));
      }
    });
  }, { threshold: 0.3 });
  const energySection = document.getElementById('energy');
  if (energySection) barObserver.observe(energySection);

  // ─── GSAP: Hero 헤드라인 stagger ───────────────────
  gsap.fromTo('#hero .hero-headline span',
    { y: 60, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.0, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: '#hero', start: 'top 80%', once: true }
    }
  );

  // ─── GSAP: Key Numbers pin + 카운터 트리거 ──────────
  ScrollTrigger.create({
    trigger: '#numbers',
    start: 'top top',
    end: '+=600',
    pin: true,
    onEnter: () => CounterAnim.init(),
    once: true
  });

  // ─── GSAP: Heritage 타임라인 행 stagger ────────────
  gsap.fromTo('#heritage .timeline-row',
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power2.out',
      scrollTrigger: { trigger: '#heritage .timeline-section', start: 'top 75%', once: true }
    }
  );

  // ─── GSAP: 챕터 타이틀 슬라이드인 ─────────────────
  ['#value', '#energy', '#social'].forEach(id => {
    gsap.fromTo(`${id} .chapter-header h2`,
      { x: -40, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.0, ease: 'power3.out',
        scrollTrigger: { trigger: `${id} .chapter-header`, start: 'top 75%', once: true }
      }
    );
  });

  // ─── GSAP: Factory 수치 카운터 트리거 ──────────────
  ScrollTrigger.create({
    trigger: '.factory-section',
    start: 'top 70%',
    once: true,
    onEnter: () => {
      document.querySelectorAll('.factory-section [data-count-to]').forEach(el => {
        CounterAnim.animateValue(el, 0,
          parseFloat(el.dataset.countTo),
          parseInt(el.dataset.countDuration || '1800')
        );
      });
    }
  });
});

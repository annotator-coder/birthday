// components/loader.js
const Loader = {
  async init(chapters) {
    const main = document.getElementById('brochure');

    for (const chapter of chapters) {
      try {
        const [html, data] = await Promise.all([
          fetch(chapter.html).then(r => r.text()),
          fetch(chapter.data).then(r => r.json()),
        ]);
        const section = document.createElement('section');
        section.id = chapter.id;
        section.className = 'chapter';
        section.innerHTML = html; // HTML files are project-owned; safe for this use case
        Loader._bind(section, data);
        section.dataset.config = JSON.stringify(data);
        main.appendChild(section);
      } catch (e) {
        console.warn(`[Loader] ${chapter.id} 로드 실패:`, e.message);
      }
    }

    // Chapter 1: render bar chart
    const ch1 = document.getElementById('chapter1');
    if (ch1) {
      const data = JSON.parse(ch1.dataset.config);
      const chartSection = data.sections.find(s => s.type === 'chart-section');
      const canvas = ch1.querySelector('#ch1-bar-chart');
      if (chartSection && canvas) ChartSection._create(canvas, chartSection.chart);
    }

    // Chapter 2: render tab sections
    const ch2 = document.getElementById('chapter2');
    if (ch2) {
      const data = JSON.parse(ch2.dataset.config);
      const tabSection = data.sections.find(s => s.type === 'tab-section');
      const tabContainer = ch2.querySelector('#ch2-business-tabs');
      if (tabSection && tabContainer) TabSection.render(tabContainer, tabSection);
    }

    // Chapter 3: render tab section
    const ch3 = document.getElementById('chapter3');
    if (ch3) {
      const data = JSON.parse(ch3.dataset.config);
      const tabSection = data.sections.find(s => s.type === 'tab-section');
      const tabContainer = ch3.querySelector('#ch3-dx-tabs');
      if (tabSection && tabContainer) TabSection.render(tabContainer, tabSection);
    }

    // Chapter 4: render expand cards (both sections)
    const ch4 = document.getElementById('chapter4');
    if (ch4) {
      const data = JSON.parse(ch4.dataset.config);
      data.sections.forEach(section => {
        if (section.type === 'expand-card') {
          const id = section.id === '4-1' ? '#ch4-social-cards' : '#ch4-sports-cards';
          const container = ch4.querySelector(id);
          if (container) ExpandCard.render(container, section);
        }
      });
    }

    // 첫 챕터 활성화
    const first = main.querySelector('.chapter');
    if (first) first.classList.add('active');

    // Initialize counter animations after all sections are rendered
    StatCounter.initAll();
    RevealObserver.init();
  },

  // data-bind="key.nested" → data 객체에서 값을 찾아 textContent 설정
  _bind(el, data) {
    el.querySelectorAll('[data-bind]').forEach(node => {
      const value = Loader._get(data, node.dataset.bind);
      if (value !== undefined) node.textContent = value;
    });
    // data-bg="key" → background-image 설정
    el.querySelectorAll('[data-bg]').forEach(node => {
      const value = Loader._get(data, node.dataset.bg);
      if (value !== undefined) node.style.backgroundImage = `url('${value}')`;
    });
  },

  _get(obj, path) {
    return path.split('.').reduce((o, k) => o?.[k], obj);
  },
};

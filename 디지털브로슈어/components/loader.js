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

    // 첫 챕터 활성화
    const first = main.querySelector('.chapter');
    if (first) first.classList.add('active');
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
      if (value !== undefined) node.style.backgroundImage = `url('${CSS.escape(value)}')`;
    });
  },

  _get(obj, path) {
    return path.split('.').reduce((o, k) => o?.[k], obj);
  },
};

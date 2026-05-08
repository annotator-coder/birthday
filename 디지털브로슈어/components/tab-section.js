// components/tab-section.js
const TabSection = {
  initAll() {
    document.querySelectorAll('[data-component="tab-section"]').forEach(el => {
      TabSection._init(el);
    });
  },

  _init(container) {
    const tabs = container.querySelectorAll('.tab-section__tab');
    const panels = container.querySelectorAll('.tab-section__panel');

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        panels[i]?.classList.add('active');
      });
    });

    // 첫 탭 활성화
    tabs[0]?.classList.add('active');
    panels[0]?.classList.add('active');
  },

  // JSON data로 탭 섹션 HTML 동적 생성
  render(container, section) {
    container.setAttribute('data-component', 'tab-section');
    container.className = 'tab-section';
    container.innerHTML = `
      <div class="tab-section__sidebar">
        ${section.tabs.map((tab, i) => `
          <div class="tab-section__tab" data-tab="${i}">
            <div class="tab-section__tab-icon">${tab.abbr || tab.id.slice(0,1).toUpperCase()}</div>
            <div class="tab-section__tab-info">
              <h3>${tab.label}</h3>
              <p>${tab.labelKo || ''}</p>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="tab-section__content">
        ${section.tabs.map(tab => `
          <div class="tab-section__panel">
            <p class="tab-section__desc">${tab.description || ''}</p>
            <div class="tab-section__stats">
              ${(tab.stats || []).map(s => `
                <div class="tab-section__stat-item">
                  <div class="tab-section__stat-label">${s.label}</div>
                  <div class="tab-section__stat-value" data-count="${s.value}">${s.value}</div>
                  <div class="tab-section__stat-unit">${s.unit || ''}</div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
    TabSection._init(container);
  },
};

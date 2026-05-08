// components/expand-card.js
const ExpandCard = {
  initAll() {
    document.querySelectorAll('[data-component="expand-cards"]').forEach(el => {
      ExpandCard._init(el);
    });
  },

  _init(container) {
    container.querySelectorAll('.expand-card').forEach(card => {
      const btn = card.querySelector('.expand-card__btn');
      btn?.addEventListener('click', e => {
        e.stopPropagation();
        const isExpanded = card.classList.contains('expanded');
        // 다른 카드 닫기
        container.querySelectorAll('.expand-card').forEach(c => c.classList.remove('expanded'));
        if (!isExpanded) card.classList.add('expanded');
      });
    });
  },

  render(container, section) {
    container.setAttribute('data-component', 'expand-cards');
    container.className = 'expand-cards';
    container.innerHTML = section.cards.map(card => `
      <div class="expand-card">
        <div class="expand-card__bg" style="background-image: url('${card.image || ''}')"></div>
        <div class="expand-card__overlay"></div>
        <div class="expand-card__content">
          <h3 class="expand-card__title">${card.title}</h3>
          <p class="expand-card__summary">${card.summary}</p>
          <div class="expand-card__detail">
            <p>${card.detail || ''}</p>
            ${(card.stats || []).map(s => `
              <div class="expand-card__stat">
                <div class="expand-card__stat-value">${s.value}</div>
                <div>${s.label}</div>
              </div>
            `).join('')}
          </div>
          <button class="expand-card__btn" aria-label="상세보기">+</button>
        </div>
      </div>
    `).join('');
    ExpandCard._init(container);
  },
};

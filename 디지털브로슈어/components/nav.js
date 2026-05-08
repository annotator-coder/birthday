// components/nav.js
const Nav = {
  _chapters: [],
  _current: 0,

  init(chapterIds) {
    Nav._chapters = chapterIds;
    Nav._current = 0;

    // 네비게이션 탭 클릭
    document.querySelectorAll('.nav-chapters li').forEach((li, i) => {
      li.addEventListener('click', () => Nav.goTo(i));
    });

    // 이전/다음 버튼
    document.getElementById('prev-btn').addEventListener('click', () => Nav.goTo(Nav._current - 1));
    document.getElementById('next-btn').addEventListener('click', () => Nav.goTo(Nav._current + 1));

    // 키보드 좌/우 화살표
    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') Nav.goTo(Nav._current + 1);
      if (e.key === 'ArrowLeft')  Nav.goTo(Nav._current - 1);
    });

    Nav._updateUI();
  },

  goTo(index) {
    if (index < 0 || index >= Nav._chapters.length) return;

    // 이전 챕터 비활성화
    const prev = document.getElementById(Nav._chapters[Nav._current]);
    if (prev) prev.classList.remove('active');

    Nav._current = index;

    // 새 챕터 활성화
    const next = document.getElementById(Nav._chapters[Nav._current]);
    if (next) {
      next.classList.add('active');
      next.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    Nav._updateUI();
  },

  _updateUI() {
    // 네비 탭 active 표시
    document.querySelectorAll('.nav-chapters li').forEach((li, i) => {
      li.classList.toggle('active', i === Nav._current);
    });
    // 버튼 비활성화
    document.getElementById('prev-btn').disabled = Nav._current === 0;
    document.getElementById('next-btn').disabled = Nav._current === Nav._chapters.length - 1;
  },
};

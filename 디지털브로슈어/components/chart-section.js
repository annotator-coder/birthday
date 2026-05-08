// components/chart-section.js
const ChartSection = {
  _defaults: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(13,27,42,0.9)',
        titleColor: '#00C853',
        bodyColor: '#fff',
        padding: 12,
        cornerRadius: 6,
      },
    },
  },

  initAll() {
    document.querySelectorAll('[data-component="chart"]').forEach(el => {
      const config = JSON.parse(el.dataset.chartConfig || '{}');
      ChartSection._create(el, config);
    });
  },

  render(container, chartConfig) {
    const wrap = document.createElement('div');
    wrap.className = 'chart-section__canvas-wrap';
    const canvas = document.createElement('canvas');
    wrap.appendChild(canvas);
    container.appendChild(wrap);
    ChartSection._create(canvas, chartConfig);
  },

  _create(canvas, config) {
    if (!window.Chart) { console.warn('[ChartSection] Chart.js not loaded'); return; }
    new Chart(canvas, {
      type: config.type || 'bar',
      data: config.data,
      options: { ...ChartSection._defaults, ...(config.options || {}) },
    });
  },

  // 막대차트 데이터 헬퍼
  barData(labels, datasets) {
    return {
      type: 'bar',
      data: {
        labels,
        datasets: datasets.map((d, i) => ({
          label: d.label,
          data: d.values,
          backgroundColor: ['#00C853', '#00897B', '#1A237E', '#37474F'][i % 4],
          borderRadius: 4,
        })),
      },
    };
  },
};

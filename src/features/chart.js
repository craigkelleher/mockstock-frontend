import { Chart } from 'chart.js';

export function renderChart(data) {
  const labels = data.map(item => item.label);
  const values = data.map(item => item.value);
  
  const ctx = document.getElementById('chart').getContext('2d');
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels,
      datasets: [
        {
          label: 'Portfolio',
          data: values,
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#1ABC9C',
            '#8E44AD',
            '#2ECC71',
            '#3498DB',
            '#F1C40F',
            '#E74C3C',
            '#95A5A6',
            '#F39C12',
            '#D35400',
            '#C0392B',
            '#BDC3C7',
            '#7F8C8D'
          ],
        },
      ],
    },
    options: {
      responsive: true,
    },
  });
}

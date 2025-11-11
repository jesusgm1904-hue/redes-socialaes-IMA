Chart.register(ChartDataLabels);

const exampleData = [
  { uso: 'Negocios', tiempo: '8 a 5 hrs', vive: 'Sí', contenido: 'Videos cortos', publica: 'Casi nunca', importa: 'No', fin: 'Aburrimiento', seguro: 'Sí', foto: 'Convivir', autoestima: 'Atención' },
  { uso: 'Entretenimiento', tiempo: '4 a 2 hrs', vive: 'No', contenido: 'Reels', publica: 'No tan seguido', importa: 'Sí', fin: 'Interés', seguro: 'No', foto: 'Foto', autoestima: 'Inseguridad' },
  { uso: 'Académico', tiempo: '1 a 2 hrs', vive: 'Sí', contenido: 'Podcast', publica: 'Nunca', importa: 'No', fin: 'Educación', seguro: 'Sí', foto: 'Convivir', autoestima: 'Autoestima baja' }
];

const preguntas = [
  ['chart1', 'uso'],
  ['chart2', 'tiempo'],
  ['chart3', 'vive'],
  ['chart4', 'contenido'],
  ['chart5', 'publica'],
  ['chart6', 'importa'],
  ['chart7', 'fin'],
  ['chart8', 'seguro'],
  ['chart9', 'foto'],
  ['chart10', 'autoestima']
];

function count(arr, key) {
  const map = {};
  arr.forEach(o => {
    if (!o[key]) return;
    map[o[key]] = (map[o[key]] || 0) + 1;
  });
  return map;
}

function percentFormat(values) {
  const total = values.reduce((a, b) => a + b, 0);
  return values.map(v => ((v / total) * 100).toFixed(1) + '%');
}

function renderCharts(data) {
  preguntas.forEach(([id, campo]) => {
    const obj = count(data, campo);
    const labels = Object.keys(obj);
    const values = Object.values(obj);
    const percentages = percentFormat(values);

    new Chart(document.getElementById(id), {
      type: labels.length > 4 ? 'bar' : 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: 'Porcentaje',
          data: values,
          backgroundColor: ['#60a5fa', '#3b82f6', '#1d4ed8', '#93c5fd', '#2563eb', '#1e3a8a']
        }]
      },
      options: {
        plugins: {
          legend: { labels: { color: '#f1f5f9' } },
          datalabels: {
            color: '#f8fafc',
            formatter: (value, ctx) => percentages[ctx.dataIndex],
            font: { weight: 'bold' }
          }
        },
        scales: {
          x: { ticks: { color: '#e2e8f0' } },
          y: { ticks: { color: '#e2e8f0' }, beginAtZero: true }
        }
      }
    });
  });
}

function parseCSV(text) {
  const rows = text.trim().split(/\\r?\\n/).map(r => r.split(','));
  const headers = rows[0];
  return rows.slice(1).map(r => Object.fromEntries(r.map((v, i) => [headers[i].trim(), v.trim()])));
}

document.getElementById('btnReset').addEventListener('click', () => renderCharts(exampleData));
document.getElementById('btnUpdate').addEventListener('click', () => {
  const text = document.getElementById('csvInput').value.trim();
  if (!text) return renderCharts(exampleData);
  renderCharts(parseCSV(text));
});

// Inicial
renderCharts(exampleData);

import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
} from 'chart.js';
import { getSouthAmerica } from '../api/countries';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip);

const makeColors = (n, s = 65, l = 60) =>
  Array.from(
    { length: n },
    (_, i) => `hsl(${Math.round((360 / n) * i)} ${s}% ${l}%)`
  );

const Population = () => {
  const [labels, setLabels] = React.useState([]);
  const [values, setValues] = React.useState([]);

  React.useEffect(() => {
    getSouthAmerica().then((rows) => {
      setLabels(rows.map((c) => c.name?.common ?? 'Unknown'));
      setValues(rows.map((c) => c.population ?? 0));
    });
  }, []);

  if (!labels.length) return <p>Loading…</p>;

  const fills = makeColors(labels.length, 65, 60);
  const strokes = makeColors(labels.length, 65, 42);

  const data = {
    labels,
    datasets: [
      {
        label: 'Population',
        data: values,
        backgroundColor: fills,
        borderColor: strokes,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { mode: 'index', intersect: false },
    },
    scales: {
      y: { beginAtZero: true },
      x: { ticks: { maxRotation: 45 } },
    },
  };

  return (
    <section>
      <h2>Population of the different countries in South America</h2>
      <div
        className="chart-wrap"
        role="figure"
        aria-label="Population by country"
      >
        <Bar data={data} options={options} />
      </div>
    </section>
  );
};

export default Population;

import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { getSouthAmerica } from "../api/countries";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const makeColors = (n, s = 65, l = 60) =>
  Array.from(
    { length: n },
    (_, i) => `hsl(${Math.round((360 / n) * i)} ${s}% ${l}%)`
  );

const Density = () => {
  const [labels, setLabels] = React.useState([]);
  const [values, setValues] = React.useState([]);

  React.useEffect(() => {
    getSouthAmerica().then((rows) => {
      const withDensity = rows.map((c) => ({
        name: c.name?.common ?? "Unknown",
        density:
          c.area && c.population
            ? Number((c.population / c.area).toFixed(2))
            : 0,
      }));

      const top = withDensity
        .sort((a, b) => b.density - a.density)
        .slice(0, 10);
      setLabels(top.map((r) => r.name));
      setValues(top.map((r) => r.density));
    });
  }, []);

  if (!labels.length) return <p>Loading…</p>;

  const fills = makeColors(labels.length, 65, 60);
  const strokes = makeColors(labels.length, 65, 42);

  const data = {
    labels,
    datasets: [
      {
        label: "People per km²",
        data: values,
        backgroundColor: fills,
        borderColor: strokes,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: { beginAtZero: true, title: { display: true, text: "people / km²" } },
      y: { ticks: { autoSkip: false } },
    },
  };

  return (
    <section>
      <h2>Top 10 Countries by Population Density (South America)</h2>
      <div className="chart-wrap" role="figure" aria-label="Population density">
        <Bar data={data} options={options} />
      </div>
    </section>
  );
};

export default Density;

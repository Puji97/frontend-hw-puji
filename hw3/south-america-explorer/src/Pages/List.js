import React from 'react';
import { getSouthAmerica } from '../api/countries';

const List = () => {
  const [countries, setCountries] = React.useState([]);

  React.useEffect(() => {
    getSouthAmerica().then((rows) => {
      const sorted = [...rows].sort((a, b) =>
        (a.name?.common ?? '').localeCompare(b.name?.common ?? '')
      );
      setCountries(sorted);
    });
  }, []);

  if (!countries.length) return <p>Loading…</p>;

  return (
    <section>
      <h2>Countries of South America</h2>

      <ul className="grid" aria-label="Countries list">
        {countries.map((c) => {
          const name = c.name?.common ?? 'Unknown';
          const descId = `desc-${name.replace(/\s+/g, '-').toLowerCase()}`;
          const flag = c.flags?.png || c.flags?.svg || '';
          const flagAlt = `Flag of ${name}`;

          const long =
            c.flags?.alt ||
            `${name} is in ${c.subregion || c.region || 'South America'}.`;

          return (
            <li className="card" key={name}>
              <img
                src={flag}
                alt={flagAlt}
                width="64"
                height="48"
                aria-describedby={descId}
              />

              <h3 style={{ marginTop: '0.5rem' }}>{name}</h3>

              <p id={descId} style={{ margin: 0 }}>
                {long}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default List;

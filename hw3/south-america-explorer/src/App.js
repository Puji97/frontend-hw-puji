import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Navigate,
} from "react-router-dom";

import Home from "./Pages/Home";
import List from "./Pages/List";
import Population from "./Pages/Population";
import Density from "./Pages/Density";

const App = () => (
  <BrowserRouter>
    <header className="site-header">
      <h1 className="site-title">South America Explorer</h1>
      <nav aria-label="Primary">
        <ul className="nav">
          <li>
            <NavLink to="/home">Home</NavLink>
          </li>
          <li>
            <NavLink to="/list">List</NavLink>
          </li>
          <li>
            <NavLink to="/population">Population</NavLink>
          </li>
          <li>
            <NavLink to="/density">Population Density</NavLink>
          </li>
        </ul>
      </nav>
    </header>

    <main className="container" role="main">
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/list" element={<List />} />
        <Route path="/population" element={<Population />} />
        <Route path="/density" element={<Density />} />
        <Route path="*" element={<p>Not found</p>} />
      </Routes>
    </main>
  </BrowserRouter>
);

export default App;

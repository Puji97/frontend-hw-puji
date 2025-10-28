const escapeForRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const highlight = (text, query) => {
  if (!query) return text;
  const pattern = new RegExp(escapeForRegex(query), "gi");
  return text.replace(pattern, (m) => `<mark>${m}</mark>`);
};

// --- DOM
const form = document.getElementById("searchForm");
const input = document.getElementById("userInput");
const results = document.getElementById("results");
const alertRegion = document.getElementById("alertRegion");

// --- UI helpers
const showAlert = (type, message) => {
  alertRegion.innerHTML = `<div class="alert alert-${type}" role="status">${message}</div>`;
};

const clearAlert = () => {
  alertRegion.innerHTML = "";
};

const renderCard = (item, query) => {
  const col = document.createElement("div");
  col.className = "col-12 col-sm-6 col-lg-4 col-xl-3";
  col.innerHTML = `
    <div class="card h-100 shadow-sm">
      <div class="card-body">
        <h5 class="card-title mb-2">${highlight(item.name, query)}</h5>
        <p class="card-text mb-1 text-muted">
          Height: <span class="fw-semibold">${item.height}</span>
        </p>
        <p class="card-text text-muted mb-0">
          Birth year: <span class="fw-semibold">${item.birth_year}</span>
        </p>
      </div>
    </div>
  `;
  return col;
};

const renderResults = (items, query) => {
  results.replaceChildren();
  if (items.length === 0) {
    showAlert("warning", "No results. Try another search term.");
    return;
  }
  clearAlert();
  const frag = document.createDocumentFragment();
  items.forEach((c) => frag.appendChild(renderCard(c, query)));
  results.appendChild(frag);
};

// --- events
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const q = input.value.trim();
  if (q === "") {
    results.replaceChildren();
    showAlert("info", "Type a name to search.");
    return;
  }
  const matches = characters.filter((c) =>
    c.name.toLowerCase().includes(q.toLowerCase())
  );
  renderResults(matches, q);
});

// Clear results when the field is cleared (nice UX)
input.addEventListener("input", () => {
  if (input.value.trim() === "") {
    results.replaceChildren();
    showAlert("info", "Type a name to search.");
  } else {
    clearAlert();
  }
});

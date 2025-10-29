const escapeForRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const input = document.getElementById("userInput");
const textEl = document.getElementById("text");
const originalHTML = textEl.innerHTML;

const highlight = (query) => {
  const q = query.trim();
  if (q === "") {
    textEl.innerHTML = originalHTML;
    return;
  }
  const pattern = new RegExp(`\\b${escapeForRegex(q)}\\b`, "giu");
  const highlighted = originalHTML.replace(pattern, (m) => `<mark>${m}</mark>`);
  textEl.innerHTML = highlighted;
};

input.addEventListener("input", () => highlight(input.value));

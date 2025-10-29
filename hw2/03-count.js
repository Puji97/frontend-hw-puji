/**
 * Escape a string so it can be safely used inside a RegExp.
 * @param {string} s
 * @returns {string}
 */
const escapeForRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const input = document.getElementById("userInput");
const textEl = document.getElementById("text");

// Keep the pristine original so we can restore it
const originalHTML = textEl.innerHTML;

/**
 * Highlight all whole-word matches with <mark>.
 * - Case-insensitive
 * - Uses \b word boundaries so we don't match inside other words
 * @param {string} query
 */
const highlight = (query) => {
  const q = query.trim();
  if (q === "") {
    textEl.innerHTML = originalHTML;
    return;
  }

  // \b = word boundary; use 'u' for better unicode handling with punctuation/dash
  const pattern = new RegExp(`\\b${escapeForRegex(q)}\\b`, "giu");

  // Work on the original string each time to avoid nesting <mark> tags
  const highlighted = originalHTML.replace(pattern, (m) => `<mark>${m}</mark>`);
  textEl.innerHTML = highlighted;
};

input.addEventListener("input", () => highlight(input.value));

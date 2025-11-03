const btn = document.getElementById("toggleBtn");
const intervalInput = document.getElementById("intervalInput");

let timerId = null;
let running = false;
let currentMs = 3000;

const paintBackground = () => {
  const h = Math.floor(Math.random() * 360);
  const s = Math.floor(Math.random() * (85 - 60 + 1)) + 60;
  const l = Math.floor(Math.random() * (70 - 55 + 1)) + 55;
  const a = 0.6;
  document.body.style.backgroundColor = `hsla(${h} ${s}% ${l}% / ${a})`;
};

const setUI = (active) => {
  if (active) {
    btn.textContent = "Stop";
    btn.className = "btn btn-danger btn-lg";
    intervalInput.disabled = true;
  } else {
    btn.textContent = "Start";
    btn.className = "btn btn-primary btn-lg";
    intervalInput.disabled = false;
  }
};

const toggle = () => {
  running = !running;
  if (running) {
    const secs = Number(intervalInput.value);
    const isValid = Number.isFinite(secs) && secs >= 1;
    currentMs = (isValid ? secs : 3) * 1000;
    intervalInput.value = String(isValid ? secs : 3);
    timerId = setInterval(paintBackground, currentMs);
    paintBackground();
  } else {
    clearInterval(timerId);
    timerId = null;
  }
  setUI(running);
};

btn.addEventListener("click", toggle);

window.addEventListener("DOMContentLoaded", () => {
  paintBackground();
  toggle(); // start initially
});

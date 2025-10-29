const btn = document.getElementById("toggleBtn");
const intervalInput = document.getElementById("intervalInput");

let timerId = null;
let currentMs = 3000;

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const randomSoftColor = () => {
  const h = rand(0, 360);
  const s = rand(60, 85);
  const l = rand(55, 70);
  const a = 0.6;
  return `hsla(${h} ${s}% ${l}% / ${a})`;
};

const paintBackground = () => {
  document.body.style.backgroundColor = randomSoftColor();
};

const isRunning = () => timerId !== null;

const setRunningUI = (running) => {
  if (running) {
    btn.textContent = "Stop";
    btn.className = "btn btn-danger btn-lg";
    intervalInput.setAttribute("disabled", "true");
  } else {
    btn.textContent = "Start";
    btn.className = "btn btn-primary btn-lg";
    intervalInput.removeAttribute("disabled");
  }
};

const start = (ms) => {
  if (isRunning()) return;
  timerId = setInterval(paintBackground, ms);
  setRunningUI(true);
};

const stop = () => {
  if (!isRunning()) return;
  clearInterval(timerId);
  timerId = null;
  setRunningUI(false);
};

btn.addEventListener("click", () => {
  if (isRunning()) {
    stop();
    return;
  }
  const secs = Number(intervalInput.value);
  const isValid = Number.isFinite(secs) && secs >= 1;
  currentMs = (isValid ? secs : 3) * 1000;
  intervalInput.value = String(isValid ? secs : 3);
  start(currentMs);
  paintBackground();
});

window.addEventListener("DOMContentLoaded", () => {
  paintBackground();
  start(currentMs);
});

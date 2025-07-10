function drawCircularCountdown(ctx, progress) {
  const size = 100;
  const center = size / 2;
  const radius = 45;

  ctx.clearRect(0, 0, size, size);

  // Background circle (light green)
  ctx.beginPath();
  ctx.arc(center, center, radius, 0, 2 * Math.PI);
  ctx.fillStyle = "#ccffcc"; // very light green
  ctx.fill();

  // Foreground arc (dark green)
  const startAngle = -Math.PI / 2;
  const endAngle = startAngle + 2 * Math.PI * progress;

  ctx.beginPath();
  ctx.moveTo(center, center);
  ctx.arc(center, center, radius, startAngle, endAngle, false);
  ctx.fillStyle = "#006633"; // dark green
  ctx.fill();
}

function updateCountdowns() {
  const now = new Date();
  document.querySelectorAll(".countdown").forEach((el) => {
    if (el.dataset.title === "Workday Countdown") {
      const now = new Date();
      const start = new Date(now);
      start.setHours(8, 30, 0, 0);
      const end = new Date(now);
      end.setHours(17, 0, 0, 0);

      const total = end - start;
      const remaining = end - now;

      el.dataset.createdAt = start.toISOString();
      el.dataset.date = end.toISOString();

      const progress = remaining > 0 ? Math.max(remaining / total, 0) : 0;

      const canvas = el.querySelector("canvas");
      const ctx = canvas.getContext("2d");
      drawCircularCountdown(ctx, progress);

      const h = Math.floor(remaining / (1000 * 60 * 60));
      const m = Math.floor((remaining / (1000 * 60)) % 60);
      const text =
        remaining > 0 ? `Workday ends in ${h}h ${m}m` : `Workday is over`;

      el.querySelector(".countdown-text").textContent = text;
      return; // skip the normal flow
    }

    // ... existing logic for other timers ...
  });

  document.querySelectorAll(".countdown").forEach((el) => {
    const title = el.dataset.title;
    const target = new Date(el.dataset.date);
    const createdAt = new Date(el.dataset.createdAt);
    const total = target - createdAt;
    const remaining = target - now;

    const progress = Math.max(remaining / total, 0);

    const canvas = el.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    drawCircularCountdown(ctx, progress);

    const d = Math.floor(remaining / (1000 * 60 * 60 * 24));
    const h = Math.floor((remaining / (1000 * 60 * 60)) % 24);
    const m = Math.floor((remaining / (1000 * 60)) % 60);
    const s = Math.floor((remaining / 1000) % 60);

    const text =
      remaining <= 0
        ? `${title}: Time's up!`
        : `${title}: ${d}d ${h}h ${m}m ${s}s`;

    el.querySelector(".countdown-text").textContent = text;
  });
}

setInterval(updateCountdowns, 1000);
updateCountdowns();

document.getElementById("addCountdown").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value.trim();
  const date = document.getElementById("date").value;
  if (!title || !date) return;

  const div = document.createElement("div");
  div.className = "countdown";
  div.dataset.title = title;
  div.dataset.date = date;
  div.dataset.createdAt = new Date().toISOString();

  const canvas = document.createElement("canvas");
  canvas.width = 100;
  canvas.height = 100;

  const text = document.createElement("div");
  text.className = "countdown-text";

  div.appendChild(canvas);
  div.appendChild(text);

  document.getElementById("countdowns").appendChild(div);
  document.getElementById("addCountdown").reset();
});

// Checks across different browsers
function isFullscreen() {
  return (
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement
  );
}

function toggleFormVisibility() {
  const form = document.getElementById("addCountdown");
  const isFullscreen =
    document.fullscreenElement != null || window.innerHeight === screen.height;
  form.style.display = isFullscreen ? "none" : "flex";
}

document.addEventListener("fullscreenchange", toggleFormVisibility);
document.addEventListener("webkitfullscreenchange", toggleFormVisibility);
document.addEventListener("mozfullscreenchange", toggleFormVisibility);
document.addEventListener("MSFullscreenChange", toggleFormVisibility);

window.addEventListener("resize", toggleFormVisibility);

function updateCountdowns() {
  const now = new Date();
  document.querySelectorAll('.countdown').forEach(el => {
    const title = el.dataset.title;
    const target = new Date(el.dataset.date);
    const diff = target - now;
    if (diff <= 0) {
      el.textContent = `${title}: Time's up!`;
      return;
    }
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);
    el.textContent = `${title}: ${d}d ${h}h ${m}m ${s}s`;
  });
}
setInterval(updateCountdowns, 1000);
updateCountdowns();

document.getElementById('addCountdown').addEventListener('submit', e => {
  e.preventDefault();
  const title = document.getElementById('title').value.trim();
  const date = document.getElementById('date').value;
  if (!title || !date) return;
  const div = document.createElement('div');
  div.className = 'countdown';
  div.dataset.title = title;
  div.dataset.date = date;
  document.getElementById('countdowns').appendChild(div);
  document.getElementById('addCountdown').reset();
});

// Checks across different browsers
function isFullscreen() {
  return document.fullscreenElement ||
         document.webkitFullscreenElement ||
         document.mozFullScreenElement ||
         document.msFullscreenElement;
}

function toggleFormVisibility() {
  const form = document.getElementById('addCountdown');
  form.style.display = isFullscreen() ? 'none' : 'flex';
}

document.addEventListener('fullscreenchange', toggleFormVisibility);
document.addEventListener('webkitfullscreenchange', toggleFormVisibility);
document.addEventListener('mozfullscreenchange', toggleFormVisibility);
document.addEventListener('MSFullscreenChange', toggleFormVisibility);

window.addEventListener('resize', toggleFormVisibility);

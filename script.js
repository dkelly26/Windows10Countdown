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

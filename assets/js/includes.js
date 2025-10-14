(async () => {
  const containers = document.querySelectorAll("[data-include]");
  for (const el of containers) {
    const url = el.getAttribute("data-include");
    try {
      const res = await fetch(url);
      el.innerHTML = await res.text();
    } catch (e) {
      el.innerHTML = `<!-- Error cargando ${url} -->`;
    }
  }

  requestAnimationFrame(() => {
    const btn = document.querySelector('.nav-toggle');
    const list = document.querySelector('.nav-list');
    if (btn && list) {
      btn.addEventListener('click', () => {
        const open = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!open));
        list.classList.toggle('open');
      });
    }
    const path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-list a').forEach(a => {
      const href = a.getAttribute('href');
      const file = href.split('/').pop();
      if (file === path) a.setAttribute('aria-current', 'page');
    });
  });
})();
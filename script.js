document.querySelectorAll('.load-video').forEach((preview) => {
  const button = preview.querySelector('button');
  button.addEventListener('click', () => {
    const video = document.createElement('video');
    video.src = preview.dataset.src;
    video.controls = true;
    video.playsInline = true;
    video.preload = 'metadata';
    video.setAttribute('aria-label', preview.dataset.label.replace(/^Play /, ''));
    preview.replaceWith(video);
    video.play().catch(() => { video.focus(); });
  });
});

document.querySelectorAll('.slide-controls').forEach((controls) => {
  const grid = document.getElementById(controls.dataset.slides);
  const cards = [...grid.querySelectorAll('.video-card')];
  const count = controls.querySelector('.slide-count');
  const previous = controls.querySelector('.slide-prev');
  const next = controls.querySelector('.slide-next');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;

  const update = () => {
    const step = cards[1]?.offsetLeft - cards[0].offsetLeft || cards[0].clientWidth;
    current = Math.max(0, Math.min(cards.length - 1, Math.round(grid.scrollLeft / step)));
    count.textContent = `${String(current + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
    previous.disabled = current === 0;
    next.disabled = current === cards.length - 1;
  };

  const goTo = (index) => {
    const target = Math.max(0, Math.min(cards.length - 1, index));
    grid.scrollTo({
      left: cards[target].offsetLeft - cards[0].offsetLeft,
      behavior: reduceMotion.matches ? 'auto' : 'smooth',
    });
    current = target;
    count.textContent = `${String(current + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
    previous.disabled = current === 0;
    next.disabled = current === cards.length - 1;
  };

  previous.addEventListener('click', () => goTo(current - 1));
  next.addEventListener('click', () => goTo(current + 1));
  grid.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  grid.addEventListener('keydown', (event) => {
    if (event.target !== grid || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    goTo(current + (event.key === 'ArrowRight' ? 1 : -1));
  });
  update();
});

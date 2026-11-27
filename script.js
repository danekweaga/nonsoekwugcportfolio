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

(() => {
  'use strict';
  const copyEmail = document.querySelector('[data-copy-email]');
  if (copyEmail && navigator.clipboard?.writeText) {
    copyEmail.hidden = false;
    const status = copyEmail.nextElementSibling;
    copyEmail.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(copyEmail.dataset.copyEmail);
        status.textContent = 'Email address copied.';
      } catch {
        status.textContent = 'Select the address above to copy it.';
      }
    });
  }
  const dialog = document.querySelector('#image-dialog');
  if (!dialog) return;
  const gallery = [...document.querySelectorAll('[data-gallery]')];
  const image = dialog.querySelector('.lightbox-image');
  const caption = dialog.querySelector('.lightbox-caption');
  const count = dialog.querySelector('.lightbox-count');
  let current = 0;
  let opener;
  const showImage = index => {
    current = (index + gallery.length) % gallery.length;
    const item = gallery[current];
    image.src = item.dataset.full; image.alt = item.querySelector('img').alt;
    caption.textContent = item.dataset.caption;
    count.textContent = `${current + 1} / ${gallery.length}`;
  };
  gallery.forEach((button, index) => button.addEventListener('click', () => { opener = button; showImage(index); dialog.showModal(); }));
  dialog.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());
  dialog.querySelector('[data-previous]').addEventListener('click', () => showImage(current - 1));
  dialog.querySelector('[data-next]').addEventListener('click', () => showImage(current + 1));
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); showImage(current - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); showImage(current + 1); }
  });
  dialog.addEventListener('close', () => { if (opener) opener.focus(); });
})();

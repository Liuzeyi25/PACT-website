'use strict';
const dialog = document.getElementById('image-dialog');
const enlargedImage = document.getElementById('dialog-image');
const caption = document.getElementById('image-caption');
document.querySelectorAll('a.zoom').forEach(link => {
  link.addEventListener('click', event => {
    if (typeof dialog.showModal !== 'function') return;
    event.preventDefault();
    enlargedImage.src = link.href;
    enlargedImage.alt = link.querySelector('img').alt;
    caption.textContent = link.dataset.caption || enlargedImage.alt;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
  });
});
dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const box = dialog.getBoundingClientRect();
  if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
});
dialog.addEventListener('close', () => { document.body.style.overflow = ''; });
const copyButton = document.getElementById('copy-citation');
if (copyButton) copyButton.addEventListener('click', async () => {
  const code = document.getElementById('bibtex');
  const status = document.getElementById('copy-status');
  try {
    await navigator.clipboard.writeText(code.textContent.trim());
    copyButton.textContent = 'Copied!';
    status.textContent = 'BibTeX copied to clipboard.';
    setTimeout(() => { copyButton.textContent = 'Copy BibTeX'; status.textContent = ''; }, 2500);
  } catch {
    const range = document.createRange();
    range.selectNodeContents(code);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    status.textContent = 'Citation selected. Press Ctrl+C or ⌘C to copy.';
  }
});

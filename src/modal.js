import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

function onOpenModal(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }

  e.preventDefault();
  const imageToShow = `<img src= ${e.target.dataset.source}>`;
  console.log(imageToShow);
  const instance = basicLightbox.create(imageToShow);
  instance.show();
}

export { onOpenModal };
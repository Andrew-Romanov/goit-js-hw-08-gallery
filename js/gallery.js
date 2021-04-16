import galleryItems from "../gallery-items.js";

const galleryElement = document.querySelector('.js-gallery');
const modalElement = document.querySelector('.js-lightbox');
const modalOverlayElement = document.querySelector('.lightbox__overlay');
const modalCloseButtonElement = document.querySelector('.lightbox__button[data-action="close-lightbox"]');
const modalImageElement = document.querySelector('.lightbox__image');

function modalOpen(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') return;
  setModalImage(Number(event.target.dataset.value));
  modalElement.classList.add('is-open');
  window.addEventListener('keydown', modalKeyHandler);
};

function modalClose() {
  modalElement.classList.remove('is-open');
  setModalImageAttributes('', '');
  window.removeEventListener('keydown', modalKeyHandler);
};

function setModalImage(indexOfImage) {
  modalImageElement.dataset.value = indexOfImage;
  setModalImageAttributes(galleryItems[indexOfImage].original, galleryItems[indexOfImage].description)
};

function setModalImageAttributes(src, alt) {
  modalImageElement.src = src;
  modalImageElement.alt = alt;
};

function changeModalImage(count) {
  const newIndex = Number(modalImageElement.dataset.value) + count;
  if (newIndex === -1) {
    setModalImage(galleryItems.length - 1);
  } else if (newIndex === galleryItems.length) {
    setModalImage(0);
  } else {
    setModalImage(newIndex);
  };
};

function modalKeyHandler(event) {
  switch (event.code) {
    case 'Escape':
      modalClose();
      break;
    case 'ArrowLeft':
      changeModalImage(-1);
      break;
    case 'ArrowRight':
      changeModalImage(+1);
      break;
  };
};

const galleryElementMarkup = galleryItems.map((element, index) => {
  return `<li class="gallery__item">
    <a
      class="gallery__link"
      href="${element.original}">
      <img
        class="gallery__image"
        data-value="${index}"
        data-source="${element.original}"
        src="${element.preview}"
        alt="${element.description}">
    </a>
    </li>`;
  }).join("");

galleryElement.insertAdjacentHTML('afterbegin', galleryElementMarkup);

galleryElement.addEventListener('click', (event) => {
  modalOpen(event);
});

modalCloseButtonElement.addEventListener('click', () => {
  modalClose();
});

modalOverlayElement.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) modalClose();
});
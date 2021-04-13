import galleryItems from "../gallery-items.js";

const galleryElement = document.querySelector('.js-gallery');
const modalElement = document.querySelector('.js-lightbox');
const modalOverlayElement = document.querySelector('.lightbox__overlay');
const modalCloseButtonElement = document.querySelector('.lightbox__button[data-action="close-lightbox"]');
const modalImageElement = document.querySelector('.lightbox__image');

function modalOpen(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') return;
  modalImageElement.src = galleryItems[Number(event.target.dataset.value)].original;
  modalImageElement.alt = galleryItems[Number(event.target.dataset.value)].description;
  modalElement.classList.add('is-open');
  window.addEventListener('keydown', modalCloseOnEscapeKey);
};

function modalClose() {
  modalElement.classList.remove('is-open');
  modalImageElement.alt = '';
  modalImageElement.src = '';
  window.removeEventListener('keydown', modalCloseOnEscapeKey);
};

function modalCloseOnEscapeKey(event) {
  if (event.code === 'Escape') modalClose();
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
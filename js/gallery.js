import galleryItems from "../gallery-items.js";

const galleryElement = document.querySelector('.js-gallery');
const modalElement = document.querySelector('.js-lightbox');
const modalCloseButtonElement = document.querySelector('.lightbox__button[data-action="close-lightbox"]');
const modalImageElement = document.querySelector('.lightbox__image');

function galleryClickHandler (event) {
  if (event.target.nodeName !== 'IMG') return;
  modalImageElement.src = galleryItems[Number(event.target.dataset.value)].original;
  modalImageElement.alt = galleryItems[Number(event.target.dataset.value)].description;
  modalElement.classList.add('is-open');
};

function modalCloseButtonClickHandler (event) {
  modalElement.classList.remove('is-open');
  modalImageElement.alt = '';
  modalImageElement.src = '';
};

// console.log(
//   galleryItems.map((element) => {
//     return `<li class="gallery__item"><img class="gallery__image" src="${element.preview}" alt="${element.description}"></li>`;
//   }).join("")
// );

const galleryElementMarkup = galleryItems.map((element, index) => {
  return `<li class="gallery__item"><img class="gallery__image" data-value="${index}" src="${element.preview}" alt="${element.description}"></li>`;
  }).join("");

galleryElement.insertAdjacentHTML('afterbegin', galleryElementMarkup);

galleryElement.addEventListener('click', (event) => {
  galleryClickHandler(event);
});

modalCloseButtonElement.addEventListener('click', (event) => {
  modalCloseButtonClickHandler(event);
});

// for (let i = 1; i <= 9; i++) {
//   galleryElement.insertAdjacentHTML('afterbegin',
//     `<li class="gallery__item"><img class="gallery__image" src="${galleryItems[0].preview}" alt="${galleryItems[0].description}"></li>`);
// };
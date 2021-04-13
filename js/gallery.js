import galleryItems from "../gallery-items.js";

const galleryElement = document.querySelector('.js-gallery');
const modalElement = document.querySelector('.js-lightbox');

function galleryClickHandler (event) {
  if (event.target.nodeName !== 'IMG') return;
  console.log(Number(event.target.dataset.value));
}

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

// for (let i = 1; i <= 9; i++) {
//   galleryElement.insertAdjacentHTML('afterbegin',
//     `<li class="gallery__item"><img class="gallery__image" src="${galleryItems[0].preview}" alt="${galleryItems[0].description}"></li>`);
// };
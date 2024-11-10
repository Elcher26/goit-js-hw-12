import { getImages } from './js/pixabay-api';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { imgListElem } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import icon from './img/bi_x-octagon.png';
import { imagesTemplate } from './js/render-functions';
import simpleLightbox from 'simplelightbox';

const gallery = new simpleLightbox('.img-list a', {
  captionDelay: 500,
  captionPosition: 'bottom',
});

const iziToastOptionsForSearch = {
  iconUrl: icon,
  backgroundColor: '#ef4040',
  position: 'topRight',
  message:
    'Sorry, there are no images matching your search query. Please, try again!',
};

const iziToastOptionsForMorePhotos = {
  iconUrl: icon,
  backgroundColor: '#8fe5d9b3',
  position: 'topRight',
  message: `We're sorry, but you've reached the end of search results.`,
};

const formElem = document.querySelector('.search-form');
const loadingElem = document.querySelector('.loader');
const loadingMoreElem = document.querySelector('.loader-more-photos');

const nextPageBtnElem = document.querySelector('.js-next-page-btn');

let searchWord;
let currentPage = 1;
let totalHits;

formElem.addEventListener('submit', loadPhotos);
nextPageBtnElem.addEventListener('click', morePhotos);

async function morePhotos() {
  loadingMoreElem.classList.remove('visually-hidden');

  try {
    const responce = await getImages(currentPage + 1, searchWord);
    imgListElem.insertAdjacentHTML('beforeend', imagesTemplate(responce.hits));
    gallery.refresh();
    let elem = document.querySelector('.list-item');
    let rect = elem.getBoundingClientRect();

    window.scrollBy({
      top: -rect.y * 5,
      behavior: 'smooth',
    });
  } catch (err) {
    throw new Error(err);
  }

  loadingMoreElem.classList.add('visually-hidden');

  currentPage += 1;

  if (currentPage === Math.ceil(totalHits / 15)) {
    iziToast.show(iziToastOptionsForMorePhotos);
    nextPageBtnElem.classList.add('visually-hidden');
    loadingMoreElem.classList.add('visually-hidden');
    return;
  }
}

async function loadPhotos(e) {
  e.preventDefault();
  currentPage = 1;
  if (currentPage === Math.ceil(totalHits / 15)) {
    iziToast.show(iziToastOptionsForMorePhotos);
    nextPageBtnElem.classList.add('visually-hidden');
    loadingMoreElem.classList.add('visually-hidden');
    return;
  }
  imgListElem.innerHTML = '';

  loadingElem.classList.remove('visually-hidden');

  const searchText = formElem.elements.searchText.value.trim();
  if (searchText === '') {
    loadingElem.classList.add('visually-hidden');
    return;
  }
  searchWord = searchText;
  try {
    const responce = await getImages(currentPage, searchText);

    if (responce.hits.length === 0) {
      iziToast.show(iziToastOptionsForSearch);
      loadingElem.classList.add('visually-hidden');
      formElem.reset();
      return;
    }
    totalHits = responce.totalHits;

    loadingElem.classList.add('visually-hidden');

    imgListElem.innerHTML = imagesTemplate(responce.hits);

    gallery.refresh();
    nextPageBtnElem.classList.remove('visually-hidden');
  } catch (err) {
    throw new Error(err);
  }

  formElem.reset();
}

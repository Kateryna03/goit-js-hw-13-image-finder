import './sass/main.scss';
import PicturesApiServise from './apiService';
import picturesCardList from './templation/pictures-card-list.hbs';
import { onOpenModal } from './modal.js'
import LoadMoreBtn from './loadMoreBtn';
import { defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';
// import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
//import { alert, notice, info, success, error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import { alert } from '@pnotify/core';

// defaultModules.set(PNotifyMobile, {});

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const refGallery = document.querySelector('.gallery');
const refForm = document.querySelector('.search-form');

//var debounce = require('lodash.debounce');
//console.log(loadMoreBtn);
const picturesApiServise = new PicturesApiServise();
console.log(picturesApiServise);

refForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);
refGallery.addEventListener('click', onOpenModal);


function onSearch(e) {
  e.preventDefault();

  clearMarkupContainer();

  picturesApiServise.search = e.currentTarget.elements.query.value;
  if (picturesApiServise.search === '') {
    return alert({
      text: 'No matches found =(',
      type: 'info',
      delay: 1500,
    });
  }
  
  
  loadMoreBtn.show();
  picturesApiServise.resetPage();
  onLoadMore();
      
   
};


function onLoadMore() {
  loadMoreBtn.disable();
  return picturesApiServise.fetchPictures()
    .then(hits => {
    onRenderPicturesList(hits)
   
   const element = document.getElementById('gallery');
element.scrollIntoView({
  behavior: 'smooth',
  block: 'end',
});   
  //scrollPage();
  loadMoreBtn.enable();

  if (hits.length === 0) {
    loadMoreBtn.hide();
    return alert({
    text: 'No matches found =(',
    type: 'info',
    delay: 1500,
  }); 
  }
      });
    //.catch(console.error());
}

function onRenderPicturesList(hits) {
  const markup = picturesCardList(hits);
  refGallery.insertAdjacentHTML('beforeend', markup);
}

function clearMarkupContainer() {
 refGallery.innerHTML = ''; 
};





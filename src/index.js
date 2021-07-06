import './sass/main.scss';
import PicturesApiServise from './apiService';
import picturesCardList from './templation/pictures-card-list.hbs';
import { onOpenModal } from './modal.js'

import { defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';
// import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
//import { alert, notice, info, success, error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import { alert } from '@pnotify/core';

// defaultModules.set(PNotifyMobile, {});

// const refCountrySearch = document.querySelector('.country-search');
const refGallery = document.querySelector('.gallery');
// const refCountryInfo = document.querySelector('body > div > div');
const refForm = document.querySelector('.search-form');
const refLoadMoreBtn = document.querySelector('[data-action="load-more"]');
//var debounce = require('lodash.debounce');
const picturesApiServise = new PicturesApiServise();
console.log(picturesApiServise);

refForm.addEventListener('submit', onSearch);
refLoadMoreBtn.addEventListener('click', onLoadMore);
refGallery.addEventListener('click', onOpenModal);


function onSearch(e) {
  e.preventDefault();
  //refForm.innerHTML = '';
  picturesApiServise.search = e.currentTarget.elements.query.value;
  if (picturesApiServise.search === '') {
    return alert({
      text: 'No matches found =(',
      type: 'info',
      delay: 1000,
    });
  }
  picturesApiServise.resetPage();
 
  //refGallery.innerHTML = '';
  //refCountryInfo.innerHTML = '';
  picturesApiServise.fetchPictures()
    .then(hits => {
      clearMarkupContainer();
      onRenderPicturesList(hits);
      //.catch(console.error());
    })
}

function onLoadMore() {
  picturesApiServise.fetchPictures()
  .then(onRenderPicturesList);
    //.catch(console.error());
}

function onRenderPicturesList(hits) {
  const markup = picturesCardList(hits);
  //refGallery.innerHTML = '';
  refGallery.insertAdjacentHTML('beforeend', markup);
}

// function onRenderCountryCard(search) {
//   const markup = countryCard(search);
//   refCountryInfo.insertAdjacentHTML('afterbegin', markup);
// }
function clearMarkupContainer() {
 refGallery.innerHTML = ''; 
};

// function clickOnImg(e) {
//   e.preventDefault();
//   console.log(e);
//   if (e.target.nodeName !== "IMG") {
//     return;
//   }
//   modalRef.classList.add("is-open");
//   imageRef.alt = e.target.alt;
//   imageRef.src = e.target.dataset.source;
//   //console.log(e.target.dataset.source);
// };
// function makeMarkup(hits) {
//   if (hits.status === 404) {
//     alert({
//       text: 'No matches found =(',
//       type: 'info',
//       delay: 1000,
//     });
//     return;
  // } else if (country.length > 10) {
  //   //refCountriesList.innerHTML = '';
  //   // notification(alert);

  //   const notice = alert({
  //     title: 'Too many matches found',
  //     text: 'Please enter a more specific query!',
  //     //hide: true,
  //     animation: 'slide',
  //     delay: 1000,
  //     top: '500px',
  //     min_height: '16px',
  //     animate_speed: 200,
  //     text_escape: true,
  //     // buttons: [
  //     //   {
  //     //     text: 'ok',
  //     //     primary: true,
  //     //     click: notice => {
  //     //       notice.close();
  //     //     },
  //     //   },
  //     // ],
  //     nonblock: {
  //       nonblock: true,
  //       nonblock_opacity: 0.1,
  //     },
  //     buttons: {
  //       show_on_nonblock: true,
  //     },
  //   });
  //   return;
    // modules: {
    //   Confirm: {
    //     confirm: true,
    //   },
    // },

    // notice.on('pnotify:confirm', () => {
    //   // User confirmed, continue here...
    // });
    // notice.on('pnotify:cancel', () => {
    //   // User canceled, continue here...
    // });

    //console.log('Too many matches found. Please enter a more specific query!');
  // } else if (country.length === 1) {
  //   onRenderCountryCard(country);
  // } else if (2 <= country.length <= 10) {
  //   onRenderCountryList(country);
  // }
//}

// function error() {
//   console.log(error);
// }
// function notification(type) {
//   new PNotify({
//     text: text,
//     type: type,
//     animation: 'slide',
//     delay: 3000,
//     top: '500px',
//     min_height: '16px',
//     animate_speed: 400,
//     text_escape: true,
//     nonblock: {
//       nonblock: true,
//       nonblock_opacity: 0.1,
//     },
//     buttons: {
//       show_on_nonblock: true,
//     },
//     before_open: function (PNotify) {
//       PNotify.css({
//         top: '50px',
//       });
//     },
//   });
// }

// const defaultStack = {
//   dir1: 'down',
//   dir2: 'left',
//   firstpos1: 50, // This is the initial position of the first popup relative to dir1
//   firstpos2: 20,
//   spacing1: 10,
//   spacing2: 10,
//   push: 'top',
//   overlayClose: true,
//   modal: false,
//   context: document.body,
 //};

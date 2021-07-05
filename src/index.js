import './sass/main.scss';
import fetchCountries from './fetchCountries.js';
import countriesList from './templation/countries-list.hbs';
import countryCard from './templation/country-card.hbs';

import { defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';
// import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
//import { alert, notice, info, success, error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import { alert } from '@pnotify/core';

// defaultModules.set(PNotifyMobile, {});

const refCountrySearch = document.querySelector('.country-search');
const refCountriesList = document.querySelector('.countries-list');
const refCountryInfo = document.querySelector('body > div > div');

var debounce = require('lodash.debounce');
refCountrySearch.addEventListener('input', debounce(onSearchCountry, 500));

function onSearchCountry(e) {
  const search = e.target.value;
  refCountrySearch.innerHTML = '';
  refCountriesList.innerHTML = '';
  refCountryInfo.innerHTML = '';
  fetchCountries(search).then(makeMarkup).catch(console.error());
}

function onRenderCountryList(search) {
  const markup = countriesList(search);
  refCountriesList.innerHTML = '';
  refCountriesList.insertAdjacentHTML('beforeend', markup);
}

function onRenderCountryCard(search) {
  const markup = countryCard(search);
  refCountryInfo.insertAdjacentHTML('afterbegin', markup);
}

function makeMarkup(country) {
  if (country.status === 404) {
    alert({
      text: 'No matches found =(',
      type: 'info',
      delay: 1000,
    });
    return;
  } else if (country.length > 10) {
    //refCountriesList.innerHTML = '';
    // notification(alert);

    const notice = alert({
      title: 'Too many matches found',
      text: 'Please enter a more specific query!',
      //hide: true,
      animation: 'slide',
      delay: 1000,
      top: '500px',
      min_height: '16px',
      animate_speed: 200,
      text_escape: true,
      // buttons: [
      //   {
      //     text: 'ok',
      //     primary: true,
      //     click: notice => {
      //       notice.close();
      //     },
      //   },
      // ],
      nonblock: {
        nonblock: true,
        nonblock_opacity: 0.1,
      },
      buttons: {
        show_on_nonblock: true,
      },
    });
    return;
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
  } else if (country.length === 1) {
    onRenderCountryCard(country);
  } else if (2 <= country.length <= 10) {
    onRenderCountryList(country);
  }
}

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
// };

// export default function fetchCountries(searchQuery) {
//   return fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`).then(response => {
//     return response.json();
//   });
//   //.then(country => {
//   //console.log(country);
//   //})
//   //.catch(error => {
//   //console.log(error);
//   //});
//   // if (response.ok) {
//   //   return response.json();
// };

export default class PicturesApiServise {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  
  fetchPictures() {
    console.log(this);
    return fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=22365966-aff4cd8f16c1939d45ba5b542`)
    .then(response => {
     return response.json();
    }).then(data => {
      this.page += 1;
      return data.hits;
    });
  }

  resetPage() {
    this.page = 1;
  }

  get search() {
    return this.searchQuery;
  }

  set search(newQuery) {
    this.searchQuery = newQuery;
  };
};
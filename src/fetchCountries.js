export default function fetchCountries(searchQuery) {
  return fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`).then(response => {
    return response.json();
  });
  //.then(country => {
  //console.log(country);
  //})
  //.catch(error => {
  //console.log(error);
  //});
  // if (response.ok) {
  //   return response.json();
  // }
}

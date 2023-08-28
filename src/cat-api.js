import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_FZepRFg8FuRHMrH9K01MmohQZHWyZkU7tHDFcCE5ET63fBDMIofv93QFs4EW4wN9';

const BREED_URL = 'https://api.thecatapi.com/v1/breeds';
const CAT_URL = 'https://api.thecatapi.com/v1/images';

// Запрос на список порід
function fetchBreeds() {
  return axios
    .get(BREED_URL)
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
      return response;
    });
}

function fetchCatByBreed(breedId) {
  return axios
    .get(`CAT_URL/${breedId}`)
    .then(function (response) {
      console.log(response);
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}
export { fetchBreeds, fetchCatByBreed };

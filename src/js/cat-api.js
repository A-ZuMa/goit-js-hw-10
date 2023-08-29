import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_FZepRFg8FuRHMrH9K01MmohQZHWyZkU7tHDFcCE5ET63fBDMIofv93QFs4EW4wN9';

const BASE_URL = 'https://api.thecatapi.com/v1';
const BREED_URL = '/breeds';
const CAT_URL = '/images/search';

// Запрос на список порід
const fetchBreeds = () => {
  return axios.get(`${BASE_URL}${BREED_URL}`).then(response => {
    return response;
  });
};

const fetchCatByBreed = breedId => {
  const params = new URLSearchParams({
    breed_ids: breedId,
  });
  return axios.get(`${BASE_URL}${CAT_URL}?${params}`).then(response => {
    return response;
  });
};

export { fetchBreeds, fetchCatByBreed };

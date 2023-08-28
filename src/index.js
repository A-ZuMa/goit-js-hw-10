import axios from 'axios';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import Notiflix, { Notify } from 'notiflix';

// axios.defaults.headers.common['x-api-key'] =
//   'live_FZepRFg8FuRHMrH9K01MmohQZHWyZkU7tHDFcCE5ET63fBDMIofv93QFs4EW4wN9';
const elements = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  erroe: document.querySelector('.error'),
  infoCat: document.querySelector('.cat-info'),
  imgCat: document.querySelector('.cat-info-img'),
  descrCat: document.querySelector('.cat-info-describtion'),
};

elements.select.addEventListener('change', selectChange);

// Відмалювання вибору породи
function makeSelect(breeds) {
  const markup = breeds
    .map(breed => {
      return `<option value='${breed.reference_image_id}'>${breed.name}</option>`;
    })
    .join('');
  elements.select.insertAdjacentHTML('beforeend', markup);
  new SlimSelect({
    select: '#single',
  });
}

function selectChange(evt) {
  console.log('HELLO');
  elements.loader.classList.remove('unvisible');
  elements.imgCat.innerHTML = '';
  elements.descrCat.innerHTML = '';
  const breedId = evt.target.value;
  fetchCatByBreed(breedId)
    .then(breed => rendDescr(breed))
    .catch(error => {
      Notify.failure('WARRNING, we catch ERROR! Try to reload page ERROR #1');
    })
    .finally(() => elements.loader.classList.add('unvisible'));
}

(function fetchBreedsCollection() {
  elements.loader.classList.remove('unvisible');
  fetchBreeds()
    .then(breeds => makeSelect(breeds))
    .catch(error => {
      Notify.failure('WARRNING, we catch ERROR! Try to reload page ERROR #2');
    })
    .finally(() => {
      elements.loader.classList.add('unvisible');
      elements.select.classList.remove('unvisible');
    });
})();

function rendDescr(breed) {
  const image = `<img class="cat-image" src="$breed.url" alt="$breed.id">`;
  const description = `<h3 class="cat-info-title">${breed.breeds[0].name}</h3> 
  <p class="cat-info-description">${breed.breeds[0].description}</p>
  <p class="cat-info-temperament"><b>Temperament:</b>${breed.breeds[0].temperament}</p>`;
  elements.imgCat.insertAdjacentHTML('beforeend', image);
  elements.descrCat.insertAdjacentHTML('beforeend', description);
}

// elements.imgCat.insertAdjacentHTML('beforeend', image);
// elements.descrCat.insertAdjacentHTML('beforeend', descreption);

// axios
//   .get('https://api.thecatapi.com/v1/breeds')
//   .then(function (response) {
//     // handle success
//     console.log(response);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//   .finally(function () {
//     // always executed
//   });

//   fetch().then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// }

// new SlimSelect({
//   select: '#selectElement',
// });

// selectChange();

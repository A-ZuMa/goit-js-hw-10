import axios from 'axios';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const elements = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  infoCat: document.querySelector('.cat-info'),
  // error: document.querySelector('.error'),
  // imgCat: document.querySelector('.cat-info-img'),
  // descrCat: document.querySelector('.cat-info-describtion')
};

function handlerBreedSearch() {
  fetchBreeds()
    .then(({ data }) => {
      elements.select.innerHTML = createSelectMarkup(data);
      // console.log(data);
      new SlimSelect({
        select: elements.select,
        settings: {
          showSearch: true,
          placeholderText: 'Choose you breed',
        },
      });
    })
    .catch(err => {
      Notify.warning(`Make you choice! ${err}`);
    })
    .finally(() => {
      elements.loader.classList.add('hidden');
    });
}

handlerBreedSearch();

function createSelectMarkup(arr) {
  return arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}

elements.select.addEventListener('change', selectChange);

function selectChange(evt) {
  elements.loader.classList.remove('hidden');

  fetchCatByBreed(evt.currentTarget.value)
    .then(({ data }) => {
      Notify.success('Here you are!');
      elements.infoCat.innerHTML = createMarkup(data);
    })
    .catch(err => {
      Notify.failure(err.message);
    })
    .finally(() => {
      elements.loader.classList.add('hidden');
    });
}

function createMarkup(arr) {
  return arr
    .map(
      ({ breeds, url }) => `
        <img src="${url}" class="image" alt="${breeds.map(item => item.name)}"/>
        <div class="text">
          <h2 class="name">${breeds.map(item => item.name)}</h2>
          <div class="temperament"><span>Temperament: </span>${breeds.map(
            item => item.temperament
          )}</div>
          <div class="description">${breeds.map(item => item.description)}</div>
        </div>`
    )
    .join('');
}

// // Відмалювання вибору породи
// function makeSelect(breeds) {
//   const markup = breeds
//     .map(breed => {
//       return `<option value='${breed.reference_image_id}'>${breed.name}</option>`;
//     })
//     .join('');
//   elements.select.insertAdjacentHTML('beforeend', markup);
//   // new SlimSelect({
//   //   select: '#single',
//   // });
// }

// function selectChange(evt) {
//   console.log('HELLO');
//   elements.loader.classList.remove('unvisible');
//   elements.imgCat.innerHTML = '';
//   elements.descrCat.innerHTML = '';
//   const breedId = evt.target.value;
//   fetchCatByBreed(breedId)
//     .then(breed => rendDescr(breed))
//     .catch(error => {
//       Notify.failure('WARRNING, we catch ERROR! Try to reload page ERROR #1');
//     })
//     .finally(() => elements.loader.classList.add('unvisible'));
// }

// (function fetchBreedsCollection() {
//   elements.loader.classList.remove('unvisible');
//   fetchBreeds()
//     .then(breeds => makeSelect(breeds))
//     .catch(error => {
//       Notify.failure('WARRNING, we catch ERROR! Try to reload page ERROR #2');
//     })
//     .finally(() => {
//       elements.loader.classList.add('unvisible');
//       elements.select.classList.remove('unvisible');
//     });
// })();

// function rendDescr(breed) {
//   const image = `<img class="cat-image" src="$breed.url" alt="$breed.id">`;
//   const description = `<h3 class="cat-info-title">${breed.breeds[0].name}</h3>
//   <p class="cat-info-description">${breed.breeds[0].description}</p>
//   <p class="cat-info-temperament"><b>Temperament:</b>${breed.breeds[0].temperament}</p>`;
//   elements.imgCat.insertAdjacentHTML('beforeend', image);
//   elements.descrCat.insertAdjacentHTML('beforeend', description);
// }

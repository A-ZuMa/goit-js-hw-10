import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const elements = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  infoCat: document.querySelector('.cat-info'),
};
elements.select.classList.add('hidden');

function handlerBreedSearch() {
  fetchBreeds()
    .then(({ data }) => {
      elements.select.classList.remove('hidden');
      elements.select.innerHTML = createSelectMarkup(data);
      new SlimSelect({
        select: elements.select,
        settings: {
          showSearch: false,
          placeholderText: 'Choose a breed',
        },
      });
    })
    .catch(err => {
      Notify.warning(`Oops! Something went wrong! Try reloading the page!`);
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
          <div class="description">${breeds.map(item => item.description)}</div>
          <div class="temperament"><span>Temperament: </span>${breeds.map(
            item => item.temperament
          )}</div>
        </div>`
    )
    .join('');
}

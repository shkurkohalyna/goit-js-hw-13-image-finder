import './styles.css';
import countryTemplate from './templates/country-card.hbs';
import countryListTemplate from './templates/country-list.hbs';
import API from './js/fetchCountries';
import getRefs from './js/items';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/Material.css';
import '@pnotify/core/dist/BrightTheme.css';
import 'material-design-icons/iconfont/material-icons.css';
import { defaults, alert } from '@pnotify/core';
defaults.icons = 'material';
defaults.styling = 'material';
defaults.type = 'error';
defaults.hide = true;
defaults.width = '360px';
defaults.minHeight = '16px';
defaults.delay = '1500';
defaults.closer = false;
defaults.sticker = false;
// defaults.addClass = 'error';


const debounce = require('lodash.debounce');
const refs = getRefs();

    
refs.serchForm.addEventListener("input", debounce(onSerchCountry, 500));

function onSerchCountry(evt) {
    evt.preventDefault();
    const inputValue = evt.target.value;
    if (inputValue === '' || inputValue === ' ') {
       return alert({
            text: `Too many matches found. Please enter a more specific querty!`,
        });
     };  

  
   API.fetchCountry(inputValue).then(renderCountryCard).catch(onFetchError);
 };


function renderCountryCard(country) {
    
    onFetchError(country);
    
    
    
    if (country.length > 1 && country.length < 10) {
        const marcup = countryListTemplate(country);
        
        refs.marcupContainer.innerHTML = marcup;
    };
    if (country.length === 1 ) { 
    const marcup = countryTemplate(country[0]);
        refs.marcupContainer.innerHTML = marcup;
  }
};

function onFetchError(country) {
    
      if (country.length > 10 || country.status === 404 || country.error === SyntaxError ) {
        alert({
            text: `Too many matches found. Please enter a more specific querty!`,
           });
  };
  
    
}
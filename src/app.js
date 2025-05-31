import './style.css';
import { button } from './button.js';
import getData  from './getData.js';
import { displayMessage } from './displayMessage.js';
import { apiKey } from './config.js';


console.log(button);

const modal = document.querySelector('.modal');
const form = document.getElementById('getWeather');
const container = document.querySelector('.container');


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.querySelector('.input');
   
    const url1 = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=imperial&appid=${apiKey}`;

    const fetchData = fetch(url1);
    fetchData.then((response) => {
        if (!response.ok && response.headers.get('content-type') !== 'application/json') {
            throw new Error(`HTTP error: ${response.status}`);  
        }
        return response.json();
    })
    .then(data => getData(data))
    .catch((error) => {
        
        if (error || input.value === '' ) modal.classList.remove("modal");
        container.classList.remove('hide');
        displayMessage(`Weather Data not valid! 
            <br>Check search spelling is valid !`);
            console.error(error);
        
    });
    input.value = '';
});

const close = document.querySelector('.close');
close.addEventListener('click', () => {
    displayMessage('');
    modal.classList.add("modal");
     
});

const units = [

{
    name: "imperial",
    temp: "°F",
    wind: "mi/H",
    humidity: "%",
},

];

const tempUnit = document.querySelectorAll('.tempUnit');
const windUnit = document.querySelector('.windUnit');
const humidUnit = document.querySelector('.humidUnit');

  tempUnit.forEach(i => i.textContent = units[0].temp);
    windUnit.textContent = units[0].wind;
    humidUnit.textContent = units[0].humidity;



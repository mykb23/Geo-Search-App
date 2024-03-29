const searchInput = document.querySelector('.header-input-text');
const tempValue = document.querySelector('#temp-display');
let button = document.querySelector('#header-btn');

let lat;
let long;
let map;
let infowindow;

/**
 *  Get latitude and longitude
 * @param {string} searchInput.value
 *
 * @returns {float} latitude
 * @returns {float} longitude
 */

function getCode() {
	let location = new google.maps.LatLng(6.4550575, 3.3941795);

	infowindow = new google.maps.InfoWindow();

	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 15,
		center: location
	});

	let request = {
		query: searchInput.value,
		fields: ['name', 'geometry']
	};

	let service = new google.maps.places.PlacesService(map);

	service.findPlaceFromQuery(request, function(results, status) {
		if (status === google.maps.places.PlacesServiceStatus.OK) {
			for (var i = 0; i < results.length; i++) {
				createMarker(results[i]);
			}

			map.setCenter(results[0].geometry.location);
			lat = results[0].geometry.location.lat();
			long = results[0].geometry.location.lng();
			getWeather(lat, long);
		}
	});
}

/**
 * Set map location and marker
 *
 * @param {string} place
 */

function createMarker(place) {
	var marker = new google.maps.Marker({
		map: map,
		position: place.geometry.location
	});

	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent(place.name);
		infowindow.open(map, this);
	});
}

/**
 * Fetch weather details
 *
 * @param {string} apiKey
 * @param {float} latitude
 * @param {float} longitude
 *
 * @returns {object} data
 */

function getWeather(lat, long) {
	const apiKey = '66c75675a603aa46329b2a064c9566e7';
	let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`;

	fetch(url)
		.then(response => response.json())
		.then(data => {
			setUI(data);
			convertToCelsius(data.main.temp);
			convertToFahrenheit(data.main.temp);
			console.log(data);
		})
		.catch(e => console.log(e));
}

/**
 * Set UI details
 *
 * @param {object} data
 */
function setUI(data) {
	const speedValue = document.querySelector('#speed');
	const humiValue = document.querySelector('#humidity');
	const description = document.querySelector('#desc');
	const place = document.querySelector('#place');
	const image = document.querySelector('#img');
	const imgUrl = 'https://openweathermap.org/img/w/';

	humiValue.textContent = data.main.humidity + '%';
	speedValue.textContent = data.wind.speed + 'm/s';
	img = data.weather[0].icon;
	place.textContent = data.name + ',' + data.sys.country;
	image.src = imgUrl + img + '.png';
	description.textContent = data.weather[0].description;
}

/**
 *  * Convert temperature to celsius
 *
 * @param {object} data
 *
 * @returns {string} celsius
 */
function convertToCelsius(data) {
	const deg = '\xB0C';
	kTemp = data;
	celsius = Math.floor(kTemp - 273.15);
	celsius += deg;
	tempValue.textContent = celsius;
}

/**
 * Convert temperature to fahrenheit
 *
 * @param {object} data
 *
 * @returns {string} fahrenheit
 */

function convertToFahrenheit(data) {
	const fah = '\xB0F';
	kTemp = data;
	fahrenheit = Math.floor((kTemp - 273.15) * 1.8 + 32);
	fahrenheit += fah;
}

/**
 * Toggle Temperature function
 *
 */

function toggleTemp() {
	if (tempValue.textContent == celsius) {
		tempValue.textContent = fahrenheit;
	} else {
		tempValue.textContent = celsius;
	}
}

/**
 * Main function
 *
 *
 */
function main() {
	window.onload = function() {
		$('.content').hide();
	};
	button.addEventListener('click', function() {
		if (searchInput.value == '') {
			alert('Pleae enter a vaild place of interest');
		} else {
			getCode();
			$('.content').show();
		}
	});
}

main();

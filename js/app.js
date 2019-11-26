const searchInput = document.querySelector('.header-input-text');
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

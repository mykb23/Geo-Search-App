const searchInput = document.querySelector('.input_text');

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
	// let sydney = new google.maps.LatLng(-33.867, 151.195);

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
				results[i];
			}

			map.setCenter(results[0].geometry.location);
			lat = results[0].geometry.location.lat();
			long = results[0].geometry.location.lng();
		}
	});
}

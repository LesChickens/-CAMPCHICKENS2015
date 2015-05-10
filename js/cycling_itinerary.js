// Coordonnées de D'Jouv
var homeCoordinates = new google.maps.LatLng(45.3925870, -72.2244330);
var bikeRideCenterCoordinates = new google.maps.LatLng(45.34704819902393, -72.21535555000003);

var map = null;
var markers = new Array(2);
var watchId;

$('a[href="#cycling_itinerary"]').click(function () {
	if (map == null) {
		initializeMap();
	}
});

$('a[href="#recenter"]').click(function () {
	if (map != null) {
		map.setCenter(bikeRideCenterCoordinates);
	}
});

function initializeMap() {
	drawMap(bikeRideCenterCoordinates);

	if (navigator.geolocation) {
		// Si la géolocalisation est possible via le navigateur on cale un vélo qui suit la position courante du device
		watchId = navigator.geolocation.watchPosition(moveBicycleMarker, positionError, { maximumAge: 500000, enableHighAccuracy: true, timeout: 6000 });
	}

	resizeMap();
}

function drawMap(latlng) {
	var parameters = {
		zoom: 12,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	if (map == null) {
		map = new google.maps.Map(document.getElementById("map_canvas"), parameters);
	}

	// Marqueur de D'Jouv
	var marker = new google.maps.Marker({
		position: homeCoordinates,
		map: map,
		title: "D'Jouv",
		icon: "images/home.png"
	});

	loadTrack();
}

function loadTrack() {
	$.ajax({
		type: "GET",
		url: "gpx/long_chicken_track.gpx",
		dataType: "xml",
		success: function (xml) {
			var points = [];
			var bounds = new google.maps.LatLngBounds();

			// On parse le fichier gpx pour ajouter toutes les coordonnées du parcours dans l'objet LatLngBounds
			$(xml).find("trkpt").each(function () {
				// On extrait du xml la latitude et la longitude de chaque position du fichier gpx
				var lat = $(this).attr("lat");
				var lon = $(this).attr("lon");

				// On crée un objet LatLng pour y stocker les coordonnées venant d'être parsées et on l'ajoute aux coordonnées du circuit
				var p = new google.maps.LatLng(lat, lon);
				points.push(p);
				bounds.extend(p);
			});

			// On crée le tracé du parcours
			var poly = new google.maps.Polyline({
				path: points,
				strokeColor: "#FF0000",
				strokeOpacity: .7,
				strokeWeight: 4
			});

			// On set le tracé du parcours sur la map
			poly.setMap(map);

			// Fit bounds to track
			map.fitBounds(bounds);
		}
	});
}

function moveBicycleMarker(coordinates) {
	putMarker(coordinates, "Moi sur le bike", "images/bicycle.png");
}

function putMarker(position, name, iconPath) {
	removeMarker(name);

	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
		map: map,
		title: name,
		icon: iconPath
	});

	markers.push(new Array(name, marker));
}

function removeMarker(markerName) {
	if (!$.isEmptyObject(markers)) {
		for (var i = 0; i < markers.length; i++) {
			if (markers[i] != null && markers[i][0] == markerName) {
				markers[i][1].setMap(null);
				markers.splice(i, 1);
			}
		}
	}
}

function positionError(error) {
	var info = "Erreur lors de la géolocalisation : ";

	switch (error.code) {
		case error.TIMEOUT:
			info += "timeout !";
			break;
		case error.PERMISSION_DENIED:
			info += "vous n’avez pas donné la permission, on affiche le circuit par défault";
			break;
		case error.POSITION_UNAVAILABLE:
			info += "la position n’a pu être déterminée";
			break;
		case error.UNKNOWN_ERROR:
			info += "erreur inconnue";
			break;
	}
}

function resizeMap() {
	$("#map_canvas").height($(window).height() - $.mobile.activePage.find("div[data-role='header']:visible").outerHeight());
}

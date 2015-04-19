/***
 * Fichier contenant le code JavaScript permettant d'afficher la google map des circuits vélo.
 *
 * @author César Jeanroy
 * @date 08-02-2015
 *
 * Last reviews:
 *  - 08-02-2015: Ajout des fonctions qui instancient la map et qui affiche le circuit sélectionné
 */

/***********************
 *  global variables   *
 ***********************/

// Variable contenant l'objet a utiliser pour center la map sur le camp chicken
var defaultLatLng = new google.maps.LatLng(45.3925870, -72.2244330);

// Variable globale contenant la map
var map = null;

var geoLocalisation = null;

/*******************
 *  event handled  *
 *******************/

$('a[href="#cycling_itinerary"]').click(function () {
	// Si la map n'a pas déja été créé, on la créé
	if (map == null)
		mapInitialization();
});

$('a[href="#welcome"]').click(function () {
	// Si la map n'a pas déja été créé, on la créé
	if (geoLocalisation != null)
		navigator.geolocation.clearWatch(geoLocalisation);
});

/************************
 * JavaScript functions *
 ************************/

/**
 * Fonction qui charge le circuit
 */
function load_track() {
	$.ajax({
		type: "GET",
		url: "gpx/long_chicken_track.gpx",
		dataType: "xml",
		success: function (xml) {
			var points = [];
			var bounds = new google.maps.LatLngBounds();

			// On parse le fichier gpx pour créer ajouter toutes les coordonnées du parcours dans l'objet LatLngBounds
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
				// Use your own style here
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

/**
 * Fonction qui instancie la map et la centre sur le point passé en paramètre
 * @param latlng Point google map où la carte doit être centrée (google.maps.LatLng)
 */
function drawMap(latlng) {
	// On stocke en JSON les paramètres de notre carte
	var myOptions = {
		zoom: 12,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	// On crée l'instance de la map avec le options choisies et on la dessine dans le div dont l'id est passé en paramètre du constructeur
	if (map == null)
		map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);

	// Add an overlay to the map of current lat/lng
	var marker = new google.maps.Marker({
		position: latlng,
		map: map,
		title: "Bonne ride !",
		icon: ""
	});

	// On dessine le circuit une fois la map affichée
	load_track();
}

/**
 * Fonction qui initialise la map avec la position actuelle de l'utilisateur
 * ou seulement le circuit si sa position n'a pas su être déterminée
 */
function mapInitialization() {

	if (navigator.geolocation) {
		// Si la géolocalisation est possible via le navigateur on dessine la map avec la position courante du device
		geoLocalisation = navigator.geolocation.watchPosition(drawMapWithPosition, positionError, { maximumAge: 500000, enableHighAccuracy: true, timeout: 6000 });
	}
	else {
		// No geolocation support,on utilise la position par défaut
		drawMap(defaultLatLng);
	}

	// On set le bon height en fonction de la taille de l'écran du téléphone
	var mapHeight = getRealContentHeight();
	$("#map-canvas").height(mapHeight);
}

/**
 * Fonction qui gère les erreurs liées à la géolocalisation
 * @param error
 */
function positionError(error) {
	var info = "Erreur lors de la géolocalisation : ";
	switch (error.code) {
		case error.TIMEOUT:
			info += "Timeout !";
			break;
		case error.PERMISSION_DENIED:
			//Si la géolocalisation n'est pas autorisée on affiche le circuit en le centant sur le camp
			drawMap(defaultLatLng);
			info += "Vous n’avez pas donné la permission, on affiche la circuit par défault";
			break;
		case error.POSITION_UNAVAILABLE:
			info += "La position n’a pu être déterminée";
			break;
		case error.UNKNOWN_ERROR:
			info += "Erreur inconnue";
			break;
	}
	console.log(info);
}

/**
 * Fonction qui dessine la map avec la position courante du device
 * @param pos objet position contenant la position courante du device
 */
function drawMapWithPosition(pos) {
	// Location found, show map with these coordinates
	drawMap(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
}

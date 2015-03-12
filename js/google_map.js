/***
 * Fichier contenant le code JavaScript permettant d'afficher la google map des circuits vélo.
 *
 * @author César Jeanroy
 * @date 08-02-2015
 *
 * Last reviews:
 *  - 08-02-2015: Ajout des fonctions qui instancient la map et qui affiche le circuit sélectionné
 *
 */


/***********************
 *  global variables   *
 ***********************/

// Variable contenant l'objet a utiliser pour center la map sur le camp chicken
var defaultLatLng = new google.maps.LatLng(45.3925870, -72.2244330);
//Variable globale contenant la map
var map;




/*******************
 *  event handled  *
 *******************/


$('a[href="#cyclingItinerary"]' ).click(function() {
    //Si la map n'a pas déja été créé, on la créé
    if(map==null)
        mapInitialization();
});




/************************
 * JavaScript Functions *
 ************************/

/**
 * Fonction qui charge le circuit
 */
function load_track()
{
    $.ajax({
        type: "GET",
        url: "gpx/long_chicken_track.gpx",
        dataType: "xml",
        success: function(xml) {
            var points = [];
            var bounds = new google.maps.LatLngBounds ();

            //On parse le fichier gpx pour créer ajouter toutes les coordonnées
            //du parcourt dans l'objet LatLngBounds
            $(xml).find("trkpt").each(function() {

                //On extrait du xml la latitude et la longitude de chaque positions du fichier gpx
                var lat = $(this).attr("lat");
                var lon = $(this).attr("lon");

                //on créé un objet LatLng pour y stocker les coordonnées venant d'etre parsées
                // et on l'ajoute aux coordonnées du circuit

                var p = new google.maps.LatLng(lat, lon);
                points.push(p);
                bounds.extend(p);
            });

            //On créé le tracé du parcourt
            var poly = new google.maps.Polyline({
                // use your own style here
                path: points,
                strokeColor: "#FF0000",
                strokeOpacity: .7,
                strokeWeight: 4
            });

            //On set le tracé du parcourt sur la map
            poly.setMap(map);

            // fit bounds to track
            map.fitBounds(bounds);
        }
    });
}


/**
 * Fonction qui instancie la map et la centre sur le point passé en paramètre
 * @param latlng Point google map où la carte doit être centrée (google.maps.LatLng)
 */
function drawMap(latlng) {

    //On stocke en JSON les paramètrs de notre carte
    var myOptions = {
        zoom: 12,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    //On créé l'instance de la map avec le options choisies et on la dessine dans le div
    //dont l'id est passé en paramètre du constructeur.
    map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);

    // Add an overlay to the map of current lat/lng
    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        title: "Bonne ride!",
        icon:""
    });

    //on dessine le circuit une fois la map affichée
    load_track();

}

/**
 * Fonction qui initialise la map avec la position actuel de l'utilisateur
 * ou seulement le circuit si sa position n'a pas su être déterminée
 */
function mapInitialization()
{
    if ( navigator.geolocation ) {
        function success(pos) {
            // Location found, show map with these coordinates
            drawMap(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        }
        function fail(error) {
            drawMap(defaultLatLng);  // Failed to find location, show default map
        }
        // Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
        navigator.geolocation.getCurrentPosition(success, fail, {maximumAge: 500000, enableHighAccuracy:true, timeout: 6000});
    } else {
        drawMap(defaultLatLng);  // No geolocation support, show default map
    }

    //On set le bon height en fonction de la taille de l'écran du téléphone
    var mapHeight = getRealContentHeight();
    $("#map-canvas").height(mapHeight);
}

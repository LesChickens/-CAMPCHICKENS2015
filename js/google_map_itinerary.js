/***
 * Fichier contenant le code JavaScript permettant d'afficher la google map pour se rendre au camp
 *
 * @author César Jeanroy
 * @date 21-03-2015
 *
 * Last reviews:
 *
 */


/**********************
 *  global variables  *
 **********************/

// Variable contenant l'objet a utiliser pour center la map sur montréal
var montrealLatLng = new google.maps.LatLng(45.5016889, -73.5672560);
// Variable contenant l'objet a utiliser pour center la map sur jouvence
var jouvenceLatLong = new google.maps.LatLng(45.3925870, -72.2244330);
//Variable globale contenant la map
var mapItinerary=null;
//JSON contenant les information pour l'affichage dans la vue
var display = {
    map:"map-itinerary",               //id du div contenant la map
    travelInformation:"travelDetails"  //id du div contenant les dirrections à suivre
}

//Service de google map pour pouvoir afficher la dirrection entre les deux points qu'on lui demande
var directionsService = new google.maps.DirectionsService();
var directionsDisplay;

//Variable contenant la demande de géolocalisation en continue.
// On la clear quand on retourne au menu afin de ne pas faire des demandes de position pour rien.
var geoLocalisationItinerary=null;

/*******************
 *  event handled  *
 *******************/
//Quand on clique sur le lien pour afficher l'itinéraire, on le fait calculer
$('#welcome a[href="#itinerary"]' ).click(function() {
        itineraryMapInitialization();
});

//Quand on retourne sur la page d'accueil, on arrete la demande de géolocalisation du device
$('#itinerary a[href="#welcome"]' ).click(function() {
    if(geoLocalisationItinerary!=null)
        navigator.geolocation.clearWatch(geoLocalisationItinerary);
});



/************************
 * JavaScript Functions *
 ************************/

/**
 * Fonction qui initialise la map de façon différente
 * suivant la prise en charge ou non de la géolocalisation par le navigateur
 */
function itineraryMapInitialization(){

    if(navigator.geolocation) {
        geoLocalisationItinerary = navigator.geolocation.watchPosition(calcRoute, positionErrorItinerary, {maximumAge: 500000, enableHighAccuracy:true, timeout: 60000});
    }
    else {
        //On fait le calcule de la route entre notre point par défault montréa vers celui de jouvence
        calcRoute();
        console.log("Géolocatisation non supportée par le navigateur");
    }

}

/**
 * Fonction qui créé la requete au serveur google pour avoir l'itinéraire entre la position courante du device et jouvence.
 * Elle s'occupe aussi de dessiner la map et d'afficher les dirrections à suivre dans le popup prévu à cet effet
 *
 * @param position l'objet position retournée par le module de géolocalisation
 */
function calcRoute(position){

    //JSON correspondant à la requete à envoyer au service google (origine, destination et mode de transport)
    var request={
        destination : jouvenceLatLong,
        travelMode : google.maps.TravelMode.DRIVING
    };

    //Si la position a pu etre déterminée on la set en tant que point d'origine sinon on utilise montréal
    if(position){
        request["origin"] = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    }
    else{
        request["origin"] = montrealLatLng;
    }

    //Si la map n'a pas déja été créé, on la dessine
    if(mapItinerary==null)
        drawItineraryMap(request["origin"]);

    //On fait la requete au serveur de google
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsService.route(request, function(response, status) {

        if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        }
        else{
            alert("impossible de calculer l'itinéraire");
        }

    });

    //On affiche la map
    directionsDisplay.setMap(mapItinerary);
    //On affiche dans le popup, le détail de l'itinéraire
    directionsDisplay.setPanel(document.getElementById(display.travelInformation));
}

/**
* Fonction qui instancie la map et la centre sur le point passé en paramètre
* @param latlng Point google map où la carte doit être centrée (google.maps.LatLng)
*/
function drawItineraryMap(latlng) {

    //On stocke en JSON les paramètrs de notre carte
    var myOptions = {
        zoom: 12,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    //On créé l'instance de la map avec le options choisies et on la dessine dans le div
    //dont l'id est passé en paramètre du constructeur.
    mapItinerary = new google.maps.Map(document.getElementById(display.map), myOptions);

    //On set le bon height en fonction de la taille de l'écran du téléphone
    var mapHeight = getRealContentHeight();
    $("#"+display.map).height(mapHeight);
}

/**
 * Fonction qui gère les erreurs liées à la géolocalisation
 * @param error
 */
function positionErrorItinerary(error) {
    var info = "Erreur lors de la géolocalisation : ";
    switch(error.code) {
        case error.TIMEOUT:
            info += "Timeout !";
            break;
        case error.PERMISSION_DENIED:
            //Si la géolocalisation n'est pas autorisée on calcule le trajet par défault
            calcRoute();
            info += "Vous n’avez pas donné la permission, on affiche la trajet par défault";
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






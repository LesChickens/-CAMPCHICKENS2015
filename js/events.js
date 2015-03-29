/**
 * Created by César Jeanroy on 15-03-11.
 *
 * Fichier contenant les fonctions permettant de faire l'appel ajax au serveur pour récupérer la liste
 * des équipes et de la ajouter au DOM.
 */

/*******************
 *  event handled  *
 *******************/
$(document).ready(function(){
    $('a[href="#planning"]').click(function() {
        //On charge la liste des équipes
        getEvents();
    });
});


/**
 * Méthode qui fait une requete ajax au serveur pour récupèrer le JSON contenant la liste des teams
 */
function getEvents(){
	$.ajax({
		url        : "back_end/events.php",
		crossDomain: true,
		beforeSend : function() {$.mobile.loading('show')},
		complete   : function() {$.mobile.loading('hide')},
		data       : {username : 'subin', password : 'passwordx'},
		dataType   : 'json',
		success    : function(json) {
			updateDOM(json)
		},
		error      : function() {
			//console.error("error");
			alert('Now working!');
		}
	});
}

/**
 * Fonction qui parse le JSON et ajoute les éléments parsés dans la page
 */
function updateDOM(json){
	// On parcours le JSON reçu, pour chaque objet, on génère le code HTML et on l'ajoute au DOM
	var divContent = "";

	$.each(json, function(i, event) {
		divContent += eventHtml(event.title);
	});

	// On ajoute le code HTML généré dasn le DOM
	$("#events_list").html(divContent);

	// On applique le style collapsible de jquery mobile
	$("#events_list").enhanceWithin();
}

/**
 * Fonction qui retourne le code html pour une équipe à partir des infos passées en parametres
 * @param teamName  Le nom de la team
 * @param member    Un array contenant tous les membres
 */
function eventHtml(title){
	var html = "" + 
		"<div data-role='collapsible' data-inset='false' data-theme='a' data-content-theme='a'>"+
		"<h3>" + title + "</h3>" +
		"</div><!-- /collapsible -->";

	return html;
}

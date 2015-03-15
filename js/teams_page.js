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
    $('a[href="#teams"]' ).click(function() {
        //On charge la liste des équipes
        getTeams();
    });
});


/**
 * Méthode qui fait une requete ajax au serveur pour récupèrer le JSON contenant la liste des teams
 */
function getTeams(){
    $.ajax({
        type        : "post",
        url         : "back_end/controller/controller.php",
        beforeSend  : function() {$.mobile.loading('show')},
        complete    : function() {$.mobile.loading('hide')},
        data        : {team : 'all'},
        dataType:"json",
        success     : function(json) {
            //méthode qui parse le JSON et l'ajoute au DOM
            updateDOM(json)
        },
        error       : function(er) {
            //console.error("error");
            alert('Now working!'+er);
        }
    });
}

/**
 * Fonction qui parse le JSON et ajoute les éléments parsés dans la page
 */
function updateDOM(json){
    //on parcours le json recu, pour chaque objet team, on génère le code html et on l'ajoute au DOM
    var divContent="";
    $.each(json, function(i, team) {
        divContent+=teamHtml(team.teamName,team.members);
    });
   //On ajoute le code html généré dasn le DOM
   $("#team_list").html(divContent);
   //On applique le style collapsible de jquery mobile
   $("#team_list").enhanceWithin();
}

/**
 * Fonction qui retourne le code html pour une équipe à partir des infos passées en parametres
 * @param teamName  Le nom de la team
 * @param member    Un array contenant tous les membres
 */
function teamHtml(teamName,members){
   var html=""+
       "<div data-role='collapsible' data-inset='false' data-theme='a' data-content-theme='a'>"+
        "<h3>"+teamName+"</h3>"+
        "<ul data-role='listview'>";

    if(members){
        $.each(members, function(i, member) {
            //On ajoute le nom de chaque membre
            html+= "<li>"+member.name+"</li>";
        });
    }
    html+="</ul>"+
    "</div><!-- /collapsible -->";
    return html;
}
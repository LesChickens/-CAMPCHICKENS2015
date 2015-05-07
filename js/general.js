// Voir la splash screen plus longtemps
document.addEventListener("deviceready", function (e) {
	window.setTimeout(function () {
		navigator.splashscreen.hide();
	}, 5000);

}, "false");

// Url vers le contrôleur PHP principal
////var url="back_end/controller/controller.php";
////var url = "http://share-your-knowledge.olympe.in/Camp-Chickens-2015/back_end/controller/controller.php";
var url = "http://leschickens.com/applications_mobiles/campchickens2015/controller/controller.php";

// Retourne la hauteur réelle du contenu de la page
function getRealContentHeight() {
	var header = $.mobile.activePage.find("div[data-role='header']:visible");
	var footer = $.mobile.activePage.find("div[data-role='footer']:visible");
	var content = $.mobile.activePage.find("div[data-role='content']:visible:visible");
	var viewport_height = $(window).height();

	return viewport_height - header.outerHeight() - footer.outerHeight();
}

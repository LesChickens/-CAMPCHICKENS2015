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

	var content_height = viewport_height - header.outerHeight() - footer.outerHeight();

	if ((content.outerHeight() - header.outerHeight() - footer.outerHeight()) <= viewport_height) {
		content_height -= (content.outerHeight() - content.height());
	}

	return content_height;
}

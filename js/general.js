// Url vers le contrôleur PHP principal
////var url="back_end/controller/controller.php";
////var url = "http://share-your-knowledge.olympe.in/Camp-Chickens-2015/back_end/controller/controller.php";
var url = "http://leschickens.com/applications_mobiles/campchickens2015/controller/controller.php";

// Voir la splash screen plus longtemps
document.addEventListener("deviceready", function (e) {
	window.setTimeout(function () {
		navigator.splashscreen.hide();
	}, 4000);

}, "false");

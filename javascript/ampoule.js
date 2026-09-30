
//
// Nom : ampoule.js
// Date et auteur : 23 Septembre 2026 - AGERON Marius
//
// Description :
//		Ampoule
//		Fonction permettant de basculer l'état de l'ampoule
//

// Fonction Appeler_Ampulse :
//		- appelée par un événement javascript depuis une page html (comme "onclick")
//      - lit le bouton dans l'entrée html
//		- appelle la fonction BasculerAmpoule()
function OnOffAmpoule(){

    var image = document.getElementById('monimage');

    if (image.src.search("images/pic_bulboff.gif") !== -1) {

        image.src = "images/pic_bulbon.gif";

    } else {

        image.src = "images/pic_bulboff.gif";
    }

}
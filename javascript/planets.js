//
// Nom : planets.js
// Date et auteur : 30 Septembre 2026 - AGERON Marius
//
// Description :
//		Gestion de la carte interactive des planètes :
//		- Affichage de la description et du zoom de la planète au survol (onmouseover)
//		- Réinitialisation du texte et masquage du zoom à la sortie (onmouseout)
//

// Fonction writeText :
//		- appelée lors du survol (onmouseover) d'une planète
//		- met à jour le texte descriptif sous l'image
//		- affiche l'image de la planète correspondante dans la zone de zoom
function writeText(txt, image) {
    document.getElementById("desc").innerHTML = txt;

    var zoom = document.getElementById("planete_zoom");
    if (zoom && image) {
        zoom.src = image;
        zoom.style.visibility = "visible";
    }
}

// Fonction writeDefault :
//		- appelée lors de la sortie (onmouseout) d'une planète
//		- réaffiche l'indication textuelle par défaut en français
//		- masque l'image zoomée de la planète
function writeDefault() {
    document.getElementById("desc").innerHTML = "Survolez le soleil ou les planètes pour afficher leur description.";

    var zoom = document.getElementById("planete_zoom");
    if (zoom) {
        zoom.style.visibility = "hidden";
    }
}
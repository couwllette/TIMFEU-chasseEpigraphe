/**
 * @fileoverview Filtrer selon un critère
 */

/* Variables globales */
const cartes = document.querySelectorAll('.carte_personnage');
const arrBtnFiltres = document.querySelectorAll('input[type=checkbox]');

/* Écouteurs d'événement */
arrBtnFiltres.forEach(function (btnFiltre) {
    btnFiltre.addEventListener('click', filtrer);
});

/* Fonctions */
function filtrer() {
    let filtreCritere = this.dataset.critere;
    let filtreSecteur = this.dataset.secteur;
    
    
    cartes.forEach(function (carte) {

        
        carte.classList.remove('selection');

        carte.querySelector('img').src="../assests/images/galerie/vert/"+carte.dataset.id+".png";
        console.log(carte.dataset.critere);
        if (carte.dataset.critere == filtreCritere) {
            carte.querySelector('img').src="../assests/images/galerie/jaune/"+carte.dataset.id+".png";
            carte.classList.add('selection');
        }
        if(carte.dataset.secteur == filtreSecteur){
            carte.querySelector('img').src="../assests/images/galerie/jaune/"+carte.dataset.id+".png";
            carte.classList.add('selection');
        }
    });
}

/**
 * @fileoverview Filtrer selon un critère
 */

/* Variables globales */
const cartes = document.querySelectorAll('.carte_personnage');
const arrBtnFiltres = document.querySelectorAll('input[type=checkbox]');

console.log(arrBtnFiltres);
/* Écouteurs d'événement */
arrBtnFiltres.forEach(function (btnFiltre) {
    btnFiltre.addEventListener('click', filtrer);
});

/* Fonctions */
function filtrer() {
    let filtre = this.dataset.critere;
    console.log(filtre);
    cartes.forEach(function (carte) {
        carte.classList.remove('selection');
        console.log(carte.dataset.critere);
        if (carte.dataset.critere == filtre) {
            carte.classList.add('selection');
        }
    });
}

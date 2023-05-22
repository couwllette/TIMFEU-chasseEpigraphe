// Déclaration de l'objet
const objChasse = {
    // Attributs
    arrIdsPersonnagesAPiger: new Array('e0001', 'e0008', 'e0015', 'e0019'),
    arrIdsObjetsAPiger: ['e0002', 'e0004', 'e0007', 'e0021'],
    arrIdsLieuxAPiger: ['e0005', 'e0012', 'e0016', 'e0022'],
    arrValeursBoutons: ['personnage', 'lieu', 'objet'],
    refSegPersonnage: document.querySelector('#segmentpersonnage'),
    refSegObjet: document.querySelector('#segmentobjet'),
    refSegLieu: document.querySelector('#segmentlieu'),

    // Méthodes
    demarrerChasse: function () {


        document.querySelector('#zoneAucuneEnquete').hidden=true;
        document.querySelector('#zoneChasseEnCours').removeAttribute('hidden');
        document.querySelector('#zoneChasseCompletee').hidden = true;


        //---------- PIGER UNE CHASSE ----------

        const intIndexTableaupersonnage = Math.floor(Math.random() * objChasse.arrIdsPersonnagesAPiger.length);
        console.log(objChasse.arrIdsPersonnagesAPiger[intIndexTableaupersonnage]);
        objChasse.refSegPersonnage.innerHTML = objJSONepigraphes[objChasse.arrIdsPersonnagesAPiger[intIndexTableaupersonnage]].CHASSE.INDICE;
        document.querySelector('#carte_personnage').src = "../assests/images/carte/"+objChasse.arrIdsPersonnagesAPiger[intIndexTableaupersonnage]+".png";

        const intIndexTableauobjet = Math.floor(Math.random() * objChasse.arrIdsObjetsAPiger.length);
        console.log(objChasse.arrIdsObjetsAPiger[intIndexTableauobjet]);
        objChasse.refSegObjet.innerHTML = objJSONepigraphes[objChasse.arrIdsObjetsAPiger[intIndexTableauobjet]].CHASSE.INDICE;
        document.querySelector('#carte_objet').src = "../assests/images/carte/"+objChasse.arrIdsObjetsAPiger[intIndexTableauobjet]+".png";

        const intIndexTableaulieu = Math.floor(Math.random() * objChasse.arrIdsLieuxAPiger.length);
        console.log(objChasse.arrIdsLieuxAPiger[intIndexTableaulieu]);
        objChasse.refSegLieu.innerHTML = objJSONepigraphes[objChasse.arrIdsLieuxAPiger[intIndexTableaulieu]].CHASSE.INDICE;
        document.querySelector('#carte_lieu').src = "../assests/images/carte/"+objChasse.arrIdsLieuxAPiger[intIndexTableaulieu]+".png";


        //---------- LOCAL STORAGE ----------

        localStorage.id__personnage = objChasse.arrIdsPersonnagesAPiger[intIndexTableaupersonnage];
        localStorage.id__objet = objChasse.arrIdsObjetsAPiger[intIndexTableauobjet];
        localStorage.id__lieu = objChasse.arrIdsLieuxAPiger[intIndexTableaulieu];

        localStorage.personnage_est_trouve = false;
        localStorage.objet_est_trouve = false;
        localStorage.lieu_est_trouve = false;

        localStorage.setItem('nombre_indice_trouve', 0);

        //---------- DISABLED BUTTON ----------

        // document.querySelector('#btnDebuterChasse').disabled = true ;
        // document.querySelector('#btnDemarrerNouvelleChasse').removeAttribute("disabled");

        
        

    },

    initialiser: function () {
    
        if(localStorage.getItem("personnage_est_trouve") == "true" && localStorage.getItem("lieu_est_trouve") == "true" && localStorage.getItem("objet_est_trouve") == "true"){

            document.querySelector('#zoneChasseCompletee').removeAttribute("hidden");
            document.querySelector('div div.section-btns-liens-chasse').classList.add('cache');

        }

        if (localStorage.id__personnage != undefined) {

            document.querySelector('#zoneAucuneEnquete').hidden=true;
            document.querySelector('#zoneChasseEnCours').removeAttribute('hidden');

            document.querySelector('#btnDebuterChasse').disabled = true ;
            document.querySelector('#btnDemarrerNouvelleChasse').removeAttribute("disabled");

            for (let valeurBouton of this.arrValeursBoutons) {

                if (localStorage.getItem(valeurBouton + "_est_trouve") == "true") {
                    document.querySelector('#segment' + valeurBouton).innerHTML = objJSONepigraphes[localStorage.getItem("id__" + valeurBouton)].CHASSE.REPONSE;
                    document.querySelector('#carte_'+valeurBouton).src = "../assests/images/galerie/jaune/"+[localStorage.getItem("id__" + valeurBouton)]+".png";
                } else {
                    document.querySelector('#segment' + valeurBouton).innerHTML = objJSONepigraphes[localStorage.getItem("id__" + valeurBouton)].CHASSE.INDICE;
                    document.querySelector('#carte_'+valeurBouton).src = "../assests/images/carte/"+[localStorage.getItem("id__" + valeurBouton)]+".png";
                }
            }
        
        
        } else{
            document.querySelector('#zoneAucuneEnquete').hidden=false;
        }

    },

    redemarrer:function(){

        document.querySelector('#zoneAucuneEnquete').removeAttribute('hidden');
        document.querySelector('#zoneChasseEnCours').hidden=true;
        document.querySelector('#zoneChasseCompletee').hidden = true;

        localStorage.removeItem('id__personnage');
        localStorage.removeItem('id__objet');
        localStorage.removeItem('id__lieu');

        localStorage.removeItem('personnage_est_trouve');
        localStorage.removeItem('objet_est_trouve');
        localStorage.removeItem('lieu_est_trouve');

        localStorage.removeItem('nombre_indice_trouve');
    

    }

}
objChasse.initialiser();

// Déclaration des écouteurs d'événements
document.querySelector('#btnDebuterChasse').addEventListener('click', objChasse.demarrerChasse);
document.querySelector('#btnDemarrerNouvelleChasse').addEventListener('click', objChasse.demarrerChasse);
document.querySelector('#btnRedemarrerChasse').addEventListener('click', objChasse.redemarrer);

/**
 * 
 * @author Cloé Ouellette
 * @version 1
 */


// Déclaration de l'objet
const objJSONmessagesErreurs = {
    "pasDebuterChasse": "Aucune chasse en cours. Si vous désirez débuter une chasse, visitez la page <a  href='../chasse/index.html'>Chasse</a>",
    "aucunElementCoche": "Veuillez cocher une réponse.",
    "mauvaiseReponse": "Désolé. Ce n'est pas le bon élément.",
    "bonneReponse": "Bravo! Vous avez trouvé ",

};

const objFicheArtsVisuels = {

    arrValeursBoutons: ['personnage', 'lieu', 'objet'],

    // Méthode
    initialiser: function () {
        let intIdFicheCourante = obtenirValeurUrlParam('id');
        console.log(intIdFicheCourante);


        localStorage.setItem(intIdFicheCourante, true);

        document.querySelector('#nb_indice_trouve').innerHTML = localStorage.nombre_indice_trouve;

        const refPrenom = document.querySelector('.span-prenom');
        const refNom = document.querySelector('.span-nom');
        const refUrlImage = document.querySelector('#url_image');
        const refTitreImage = document.querySelector('#titre_image');
        const refCreditImage = document.querySelector('#credit_image');
        const refNotesBiographiques = document.querySelector('#notes_biographiques');
        const refCarteZoom = document.querySelector('.img-localisation');
        const refArrondissement = document.querySelector('#arrondissement');
        const refQuartier = document.querySelector('#quartier');
        const refAdresse = document.querySelector('#adresse');
        const refPlaque = document.querySelector('.p-epigraphe');
        const refSrcAudio = document.querySelector('#audio_url source');
        const refPreambuleAudio = document.querySelector('.p-description-capsule');
        const refTranscriptionAudio = document.querySelector('.p-transcription');
        const refCreditAudio = document.querySelector('.p-contexte-son');
        const refDomaine = document.querySelector('.categorie');
        const refUrlSonore = document.querySelector('#url_image_son');
        const refEpigraphe = document.querySelector('#url_epigraphe');



        const refBaliseAudio = document.querySelector('audio');


        refPrenom.innerHTML = objJSONepigraphes[intIdFicheCourante].PRENOM;
        refNom.innerHTML = objJSONepigraphes[intIdFicheCourante].NOM;
        refUrlImage.src = '../assests/images/image_titre/' + intIdFicheCourante + '.jpg';
        refTitreImage.innerHTML = objJSONepigraphes[intIdFicheCourante].IMAGE.TITRE;
        refCreditImage.innerHTML = objJSONepigraphes[intIdFicheCourante].IMAGE.CREDIT;
        refNotesBiographiques.innerHTML = objJSONepigraphes[intIdFicheCourante].BIOGRAPHIE;
        refCarteZoom.src = "../assests/images/zoomGoogle_maps/" + intIdFicheCourante + "-zoom-google-maps.png";
        refArrondissement.innerHTML = objJSONepigraphes[intIdFicheCourante].ARRONDISSEMENT;
        refQuartier.innerHTML = objJSONepigraphes[intIdFicheCourante].QUARTIER;
        refAdresse.innerHTML = objJSONepigraphes[intIdFicheCourante].ADRESSE;
        refPlaque.innerHTML = objJSONepigraphes[intIdFicheCourante].PLAQUE_TRANSCRIPTION;
        refSrcAudio.src = objJSONepigraphes[intIdFicheCourante].AUDIO.URL;
        refPreambuleAudio.innerHTML = objJSONepigraphes[intIdFicheCourante].AUDIO.DESCRIPTION;
        refTranscriptionAudio.innerHTML = objJSONepigraphes[intIdFicheCourante].AUDIO.TRANSCRIPTION;
        refCreditAudio.innerHTML = objJSONepigraphes[intIdFicheCourante].AUDIO.CREDIT;
        refDomaine.innerHTML = objJSONepigraphes[intIdFicheCourante].DOMAINE;
        refUrlSonore.src = '../assests/images/img_cap/' + intIdFicheCourante + '.jpg';
        refEpigraphe.src = '../assests/images/images_epi/' + intIdFicheCourante + '.svg'

        refBaliseAudio.load();

        if (localStorage.id__personnage == undefined) {

            // document.querySelector('#zoneAuncuneChasseEnCours').removeAttribute('hidden');
            //   document.querySelector('#zoneChasseEnCours').hidden = true;

        };


        for (let valeurBouton of this.arrValeursBoutons) {

            if (localStorage.getItem(valeurBouton + "_est_trouve") == "true") {
                document.querySelector('#' + valeurBouton).setAttribute('disabled', true);
            }
        };

        if (localStorage.getItem("personnage_est_trouve") == "true" && localStorage.getItem("lieu_est_trouve") == "true" && localStorage.getItem("objet_est_trouve") == "true") {

            document.querySelector('#zoneChasseEnCours form').setAttribute("hidden", true);

            let messageReussi = document.createElement('div');
            messageReussi.innerHTML = "<img src='../assests/images/medaillon.png' width='100px'><p>Bravo! Vous avez trouvé la phrase cachée. </p> <br> <p>Vous pouvez maintenant participer au Concours! Dirigez-vous sur la page <a style='text-decoration: none; color: #1D3D23; font-weight: bold;' href='../chasse/index.html'>Chasse</a>.</p>";
            document.querySelector('#zoneChasseEnCours').prepend(messageReussi);


        }

    },

    verifierReponse: function () {
        let intIdFicheCourante = obtenirValeurUrlParam('id');
        let nbIndiceTrouve = localStorage.nombre_indice_trouve;

        //console.log('2FicheCourante: '+ intIdFicheCourante);


        const arrBoutonsRadios = document.querySelector('input[name=formSoumission]:checked');
        console.log(arrBoutonsRadios);

        console.log('personnage: ' + localStorage.id__personnage);
        console.log('lieu: ' + localStorage.id__lieu);
        console.log('objet: ' + localStorage.id__objet);

        if (arrBoutonsRadios == null) {

            document.querySelector('#message').innerHTML = objJSONmessagesErreurs.aucunElementCoche;

        } else {

            if (intIdFicheCourante == localStorage.getItem("id__" + arrBoutonsRadios.value)) {

                document.querySelector('#message').innerHTML = objJSONmessagesErreurs.bonneReponse + "&laquo" + objJSONepigraphes[intIdFicheCourante].CHASSE.INDICE + " &raquo";

                localStorage.setItem(arrBoutonsRadios.value + "_est_trouve", true);

                nbIndiceTrouve++;

                if (nbIndiceTrouve < 3) {

                    localStorage.setItem('nombre_indice_trouve', nbIndiceTrouve);
                    document.querySelector('#nb_indice_trouve').innerHTML = localStorage.nombre_indice_trouve;

                }

                if (nbIndiceTrouve == 3) {
                    localStorage.setItem('nombre_indice_trouve', nbIndiceTrouve);
                    document.querySelector('#nb_indice_trouve').innerHTML = localStorage.nombre_indice_trouve;

                    setTimeout(function () {
                        objFicheArtsVisuels.initialiser()
                    }, 5000);
                }




                // setTimeout(objFicheArtsVisuels.initialiser(), 10000);
                console.log(nbIndiceTrouve);





            } else {
                document.querySelector('#message').innerHTML = objJSONmessagesErreurs.mauvaiseReponse;
            };

        };



    },
};

objFicheArtsVisuels.initialiser();

document.querySelector('#btnSoumettre').addEventListener('click', objFicheArtsVisuels.verifierReponse);

function obtenirValeurUrlParam(strParam) {
    return new URLSearchParams(window.location.search).get(strParam);
}
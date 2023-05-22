/**
 * @file Démo Google Maps - Création de marqueurs et d'infobulles
 * @author Yves Helie <yves.helie@cegep-ste-foy.qc.ca> 
 * @todo Personnaliser le marqueur 
 * @todo Personnaliser l'infobulle (lignes 47 à 53)
 * @version 1.1.4
 */

// Déclaration d'objet(s)  
const objCarte = {
	// Déclaration des attributs de l'objet (accessibles à toutes les méthodes de l'objet)
	objMap: null,
	arrMarqueurs: [],
	fltLatCentreCarte: 46.811638,
	fltLngCentreCarte: -71.223758,
	strUrlImages: '../assests/images/',
	intZoomCarte: 14,

	/**
	 * Permet de créer la carte Google Maps avec des marqueurs
	 */
	initialiser: function (strIdCarte) {
		// Création de la carte à l'aide de l'api Google Maps
		this.objMap = new google.maps.Map(document.getElementById(strIdCarte), {
			center: {
				lat: this.fltLatCentreCarte,
				lng: this.fltLngCentreCarte
			},
			scrollwheel: false,
			zoom: this.intZoomCarte
		});
		// demande de création des marqueurs
		this.creerMarqueurs();
	},

	/**
	 * Permet de créer tous les marqueurs sur la carte à partir du JSON
	 */
	creerMarqueurs: function () {
		// Boucle for qui se répétera tant qu'il y aura 
		// des clés de premier niveau (strIdEpigraphe) 
		// dans l'objet objJSONepigraphes
		for (let strIdEpigraphe in objJSONepigraphes) {
			const objEpigrapheCourant = objJSONepigraphes[strIdEpigraphe];

			console.log(strIdEpigraphe);
			// console.log(localStorage.getItem(strIdEpigraphe));
			//à compléter en remplaçant toutes les valeurs fixes par celles du json de la fiche actuelle! :
			const strGabaritContenuInfobulle =
				`<div class="infobulle">
				<div class="image"><img width="150" src="../assests/images/fiches/${objEpigrapheCourant.SUFFIXE_IMAGES}_w154.jpg"/></div>
				<div class="titre">${objEpigrapheCourant.PRENOM} ${objEpigrapheCourant.NOM}</div>
				<div class="adresse">Adresse : ${objEpigrapheCourant.ADRESSE}</div>
				<a class="btn" href="../fiches/fiche.html?id=${strIdEpigraphe}">Consulter la fiche de ${objEpigrapheCourant.PRENOM} ${objEpigrapheCourant.NOM}</a>
			</div>`;

			// console.log(strGabaritContenuInfobulle);

			const objInfobulle = new google.maps.InfoWindow({
				content: strGabaritContenuInfobulle
			});

			const objMarqueur = new google.maps.Marker({
					position: new google.maps.LatLng(objEpigrapheCourant.LATITUDE, objEpigrapheCourant.LONGITUDE),
					title: objEpigrapheCourant.IMAGE.TITRE,
					map: this.objMap,
					icon: null,
					infowindow: objInfobulle
				});

			if(localStorage.getItem(strIdEpigraphe) != null){
				objMarqueur.icon = `${this.strUrlImages}marqueurs/landmark-gray.svg`;
			}else{
				objMarqueur.icon = `${this.strUrlImages}marqueurs/landmark-orchid.svg`;
			};
			

			// Ajout de l'écouteur d'événements click qui lancera 
			// la fermeture de toutes les infobulles
			// avant d'ouvrir l'infobulle liée au marqueur cliqué
			objMarqueur.addListener('click', function () {
				objCarte.fermerToutesInfobulles();
				this.infowindow.open(objCarte.objMap, this);
			});

			this.arrMarqueurs.push(objMarqueur);
		}
	},

	/**
	 * Permet de fermer toute les infobulles de la carte
	 */
	fermerToutesInfobulles: function () {
		this.arrMarqueurs.forEach(function (objMarqueur) {
			objMarqueur.infowindow.close();
		});
	}
};

objCarte.initialiser('carte');
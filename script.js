// ============================================================
// script.js — Portfolio Thibault Hazotte
// ============================================================


// ============================================================
// 1. CHARGEMENT DU DATASET (template fourni par le professeur)
// ============================================================
//
// USAGE IA — fetch() et async/await :
// Je ne savais pas comment charger des données depuis une URL externe
// en JavaScript. L'IA m'a expliqué le fonctionnement de fetch() :
// c'est une fonction qui envoie une requête HTTP vers une URL et
// retourne les données. Le mot-clé "await" attend la réponse avant
// de continuer. "async" est nécessaire pour utiliser "await".
// Sans cette explication, je n'aurais pas compris pourquoi le code
// du professeur utilise ces mots-clés.

// URL du dataset fourni par le professeur
const myUrl = "https://makerslab.em-lyon.com/dww/data/people.json";

const getData = async(doStuffs) => {
    try {
        const response = await fetch(myUrl);
        if(!response.ok){
            throw new Error("Network response not ok :" + response.statusText);
        }
        const data = await response.json();
        doStuffs(data);
    } catch(error) {
        console.error("Problem occurend while getting your data" + error);
    }
}

getData((data) => {
    // your program starts here

    // data is a javascript object containing all your dataset
    console.log(data);

    // On appelle notre fonction pour afficher les données
    afficherPersonnes(data);

    // your program ends here
});


// ============================================================
// 2. AFFICHAGE DYNAMIQUE DES DONNÉES
// ============================================================
//
// USAGE IA — Création d'éléments HTML depuis JavaScript :
// Je voulais afficher les données du JSON sous forme de cartes HTML.
// Je ne savais pas comment créer des éléments HTML depuis JavaScript.
// L'IA m'a expliqué document.createElement() qui crée un élément,
// innerHTML qui permet d'insérer du HTML dans un élément,
// et appendChild() qui ajoute un élément dans la page.
// Cela m'a permis de générer les cartes automatiquement depuis les données.

function afficherPersonnes(data) {

    // On sélectionne le conteneur dans lequel on va injecter les cartes
    var conteneur = document.getElementById("people-grid");

    // Si le conteneur n'existe pas (on n'est pas sur la bonne page), on arrête
    if (!conteneur) return;

    // On vide le message de chargement
    conteneur.innerHTML = "";

    // On boucle sur chaque personne du dataset
    data.forEach(function(personne) {

        // On crée une carte pour chaque personne
        var carte = document.createElement("div");
        carte.className = "people-card";

        // On construit le contenu HTML de la carte
        // avec les données du JSON
        carte.innerHTML =
            "<div class='people-avatar'>" +
                "<i class='fa-solid fa-user'></i>" +
            "</div>" +
            "<h3 class='people-name'>" + (personne.name || personne.firstName + " " + personne.lastName || "—") + "</h3>" +
            "<p class='people-role'>" + (personne.role || personne.job || personne.title || "—") + "</p>" +
            "<p class='people-info'>" + (personne.email || personne.company || "") + "</p>";

        // On ajoute la carte dans le conteneur
        conteneur.appendChild(carte);
    });
}


// ============================================================
// 3. ANIMATIONS AU CHARGEMENT (page Home)
// ============================================================
//
// USAGE IA — window.addEventListener + setTimeout + classList :
// Je voulais que les éléments apparaissent progressivement.
// L'IA m'a expliqué setTimeout() pour déclencher une action
// après un délai, et classList.add() pour activer une animation CSS.

window.addEventListener("load", function () {
    var tag       = document.getElementById("hero-tag");
    var titre     = document.getElementById("titre");
    var sousTitre = document.getElementById("sous-titre");
    var bouton    = document.getElementById("bouton");

    if (titre) {
        setTimeout(function () { tag.classList.add("visible"); },       200);
        setTimeout(function () { titre.classList.add("visible"); },     400);
        setTimeout(function () { sousTitre.classList.add("visible"); }, 700);
        setTimeout(function () { bouton.classList.add("visible"); },   1000);
    }
});


// ============================================================
// 4. NAVBAR QUI CHANGE AU SCROLL
// ============================================================
//
// USAGE IA— window.scrollY :
// L'IA m'a expliqué window.scrollY qui retourne le nombre de pixels
// défilés, utile pour changer l'apparence de la navbar au scroll.

window.addEventListener("scroll", function () {
    var navbar = document.getElementById("navbar");
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }
});


// ============================================================
// 5. AFFICHER / CACHER LES DÉTAILS DES PROJETS
// ============================================================
//
// USAGE IA — classList.toggle() :
// L'IA m'a montré classList.toggle("open") pour alterner entre
// afficher et cacher un élément en un seul clic.

function toggleDetail(carte) {
    carte.classList.toggle("open");
}
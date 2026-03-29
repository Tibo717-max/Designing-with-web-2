// ============================================================
// script.js — Portfolio Thibault Hazotte
// ============================================================


// ============================================================
// 1. CHARGEMENT DU DATASET (template fourni par le professeur)
// ============================================================
//
// USAGE IA — fetch() et async/await :
// Je ne savais pas comment charger des données depuis une URL
// externe en JavaScript. L'IA m'a expliqué le fonctionnement
// de fetch() : c'est une fonction qui envoie une requête HTTP
// vers une URL et retourne les données au format JSON.
// Le mot-clé "await" attend la réponse avant de continuer,
// et "async" est nécessaire pour pouvoir utiliser "await".

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

    var tableau = trouverTableau(data);

    if (tableau && tableau.length > 0) {
        afficherPersonnes(tableau);
    }

    // your program ends here
});


// ============================================================
// 2. FONCTION QUI CHERCHE LE TABLEAU DANS LE JSON
// ============================================================
//
// USAGE IA — Exploration d'un objet JSON :
// Je ne savais pas comment trouver un tableau dans un JSON
// dont on ne connaît pas la structure à l'avance.
// L'IA m'a montré Object.keys() pour parcourir les clés
// et Array.isArray() pour vérifier si une valeur est un tableau.

function trouverTableau(data) {
    if (Array.isArray(data)) return data;

    if (data && typeof data === "object") {
        var cles = Object.keys(data);
        for (var i = 0; i < cles.length; i++) {
            var valeur = data[cles[i]];
            if (Array.isArray(valeur)) return valeur;
            if (valeur && typeof valeur === "object") {
                var tableau = trouverTableau(valeur);
                if (tableau) return tableau;
            }
        }
    }
    return null;
}


// ============================================================
// 3. AFFICHAGE DYNAMIQUE DES DONNÉES
// ============================================================
//
// USAGE IA — Création d'éléments HTML depuis JavaScript
// et gestion des objets imbriqués dans le JSON :
// Je ne savais pas créer des éléments HTML depuis JS.
// L'IA m'a expliqué createElement(), innerHTML, appendChild().
// Elle m'a aussi montré comment extraire un nom depuis un objet
// imbriqué comme { first: "Isaac", last: "Butler" } en
// utilisant personne.name.first + " " + personne.name.last.

function extraireNom(personne) {

    // Cas 1 : name est un objet { first: "...", last: "..." }
    if (personne.name && typeof personne.name === "object") {
        var prenom = personne.name.first || personne.name.firstName || "";
        var nom    = personne.name.last  || personne.name.lastName  || "";
        return (prenom + " " + nom).trim() || "—";
    }

    // Cas 2 : name est directement une chaîne de caractères
    if (personne.name && typeof personne.name === "string") {
        return personne.name;
    }

    // Cas 3 : firstName et lastName séparés
    if (personne.firstName || personne.lastName) {
        return ((personne.firstName || "") + " " + (personne.lastName || "")).trim();
    }

    return "—";
}

function afficherPersonnes(tableau) {

    var conteneur = document.getElementById("people-grid");
    if (!conteneur) return;

    conteneur.innerHTML = "";

    tableau.forEach(function(personne) {

        var carte = document.createElement("div");
        carte.className = "people-card";

        var nom  = extraireNom(personne);
        var role = personne.role || personne.job || personne.title || personne.position || "—";
        var info = personne.email || personne.company || personne.city || "";

        carte.innerHTML =
            "<div class='people-avatar'>" +
                "<i class='fa-solid fa-user'></i>" +
            "</div>" +
            "<h3 class='people-name'>" + nom + "</h3>" +
            "<p class='people-role'>" + role + "</p>" +
            "<p class='people-info'>" + info + "</p>";

        conteneur.appendChild(carte);
    });
}


// ============================================================
// 4. ANIMATIONS AU CHARGEMENT
// ============================================================
//
// USAGE IA — setTimeout + classList.add() :
// L'IA m'a expliqué setTimeout() pour déclencher une action
// après un délai, et classList.add() pour activer une
// animation CSS définie dans style.css.

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
// 5. NAVBAR AU SCROLL
// ============================================================
//
// USAGE IA — window.scrollY :
// L'IA m'a expliqué window.scrollY qui retourne le nombre
// de pixels défilés pour changer le style de la navbar.

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
// 6. TOGGLE DÉTAILS PROJETS
// ============================================================
//
// USAGE IA — classList.toggle() :
// L'IA m'a montré toggle() pour alterner entre afficher
// et cacher un élément en un seul clic.

function toggleDetail(carte) {
    carte.classList.toggle("open");
}
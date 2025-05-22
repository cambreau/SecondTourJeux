import "./index.scss";
import "./assets/styles/styles.scss";
import { produits } from "../data/product.js";

//--- Declaration des variables globales ---//
let nbrGroupe = Math.ceil(produits.length / 6);
let nbrGroupeAffiche = 1;

//--- Selection HTML ---//
const produitsConteneurHTML = document.querySelector(".produits-conteneur");
const boutonAfficherProduitsHTML = document.querySelector(
  ".btn-afficher-produits"
);

//--- Fonctions ---//
//----- Fonction d'initialisation -----//
function init() {
  //On divise les produits en groupe de 6
  const groupesProduits = diviserProduitsGroupe(produits);
  //On creer la structure HTML
  groupesProduits[0].forEach((produit) => {
    creerProduitHTML(produit, produitsConteneurHTML);
  });

  //Ajouter un event listener sur le bouton pour afficher les autres produits
  boutonAfficherProduitsHTML.addEventListener("click", () => {
    if (nbrGroupeAffiche < nbrGroupe) {
      //On incremente le nombre de groupe affiche
      nbrGroupeAffiche++;
      //On affiche les produits du groupe suivant
      groupesProduits[nbrGroupeAffiche - 1].forEach((produit) => {
        creerProduitHTML(produit, produitsConteneurHTML);
      });
    }
    if (nbrGroupeAffiche === nbrGroupe) {
      //On cache le bouton
      boutonAfficherProduitsHTML.classList.add("cache");
    }
  });
}

//----- Autres fonction -----//

/** Fonction division des produits par groupe de 6
 * @param {Array} produits
 * @returns {Array} groupesProduits
 */
function diviserProduitsGroupe(produits) {
  const produitsTravail = [...produits];
  let groupesProduits = [];
  for (let i = 0; i < nbrGroupe; i++) {
    const debut = i * 6;
    const fin = debut + 6;
    const groupe = produitsTravail.slice(debut, fin);
    groupesProduits.push(groupe);
  }
  return groupesProduits;
}

/**
 * Fonction qui prend en parametre un string et le transforme en format utilisable pour id et src.
 * @param {string} nomString
 * @returns {string}
 */
function formatteStringSansAccentEtEspace(nomString) {
  //Faire une copie du string dans une nouvelle constante.
  let nom = nomString;
  //Supprimer les espaces de tabulation
  nom = nom.trim();
  //Supprimer les accents
  nom = nom.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  //Mettre en minuscule
  nom = nom.toLowerCase();
  //Remplacer les espaces
  nom = nom.replaceAll(" ", "-");
  return nom;
}

/**
 * A partir d'un Objet et d'un Element HTML qui sera le conteneur, on creer la structure HTML d'un produit.
 * @param {Object} produit
 * @param {HTMLElement} parentHTML
 */
function creerProduitHTML(produit, parentHTML) {
  const produitFormatIdSrc = formatteStringSansAccentEtEspace(produit.titre);
  const templateProduit = `
  <article class="carte" id="${produitFormatIdSrc}">
    <picture class="image-produit">
      <img src="./assets/images/produits/${produitFormatIdSrc}.jpg" alt="${produit.titre}">
    </picture>
    <h3>${produit.titre}</h3>
    <div class="description-produit">
      <p>${produit.age}</p>
      <p>${produit.etat}</p>
      <p>${produit.prix}$</p>
    </div>
    <button class="bouton" href="#">
        Ajouter au panier
    </button>
  </article>`;
  parentHTML.insertAdjacentHTML("beforeend", templateProduit);
}

//--- Execution du code ---//
init();

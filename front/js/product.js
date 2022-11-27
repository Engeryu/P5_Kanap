"use strict";

var url = new URL(window.location.href);
var idProduct = url.searchParams.get("id");
console.log(idProduct);
let article = "";

const colorPicked = document.querySelector("#colors");
const quantityPicked = document.querySelector("#quantity");

getArticle();

function getArticle() {
    fetch("http://localhost:3000/api/products/" + idProduct)
        .then((res) => {
            return res.json();
        })

        .then(async function (res) {
            article = await res;
            console.table(article);
            if (article) {
                displayItems(article);
            }
        })
        .catch((error) => {
            console.log("Erreur de la requête API");
        })
}

function displayItems(article) {
    let productImg = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImg);
    productImg.src = article.imageUrl;
    productImg.alt = article.altTxt;

    let productName = document.getElementById('title');
    productName.innerHTML = article.name;

    let productPrice = document.getElementById('price');
    productPrice.innerHTML = article.price;

    let productDescription = document.getElementById('description');
    productDescription.innerHTML = article.description;

    for (let colors of article.colors) {
        console.table(colors);
        let productColors = document.createElement("option");
        document.querySelector("#colors").appendChild(productColors);
        productColors.value = colors;
        productColors.setAttribute("value", colors)
        productColors.innerHTML = colors;
    }
    addToCart(article)
}

function addToCart(article) {
    const sendCartButton = document.querySelector("#addToCart");

    sendCartButton.addEventListener("click", (event) => {
        if (quantityPicked.value > 0 && quantityPicked.value <= 100 && quantityPicked.value != 0) {

            let colorChoice = colorPicked.value;

            let qtyChoice = quantityPicked.value;

            let optionsProduit = {
                idProduit: idProduct,
                couleurProduit: colorChoice,
                quantiteProduit: Number(qtyChoice)
            };
            let productLS = JSON.parse(localStorage.getItem("produit"));

            if (productLS) {
                const resultFind = productLS.find(
                    (el) => el.idProduit === idProduct && el.couleurProduit === colorChoice);
                if (resultFind) {
                    let newQuantite =
                        parseInt(optionsProduit.quantiteProduit) + parseInt(resultFind.quantiteProduit);
                        if (newQuantite > 100) {
                            alert("Votre sélection dépasse les 100 articles ! Nous allons limiter à 100, ce sera suffisant ;)")
                            newQuantite = 100;
                        }
                            resultFind.quantiteProduit = newQuantite;
                            localStorage.setItem("produit", JSON.stringify(productLS));
                            console.table(productLS);
                            popupConfirmation(qtyChoice, article.name, colorChoice);        
                } else {
                    productLS.push(optionsProduit);
                    localStorage.setItem("produit", JSON.stringify(productLS));
                    console.table(productLS);
                    popupConfirmation(qtyChoice, article.name, colorChoice);
                }
            } else {
                productLS = [];
                productLS.push(optionsProduit);
                localStorage.setItem("produit", JSON.stringify(productLS));
                console.table(productLS);
                popupConfirmation(qtyChoice, article.name, colorChoice);
            }
        }
        else {
            alert("Votre sélection ne permet d'ajouter l'article au panier !")
        }
    });
}

const popupConfirmation = (qty, name, couleur) => {
    if (window.confirm(`Votre commande de ${qty} ${name} ${couleur} est ajoutée au panier
Pour consulter votre panier, cliquez sur OK`)) {
        window.location.href = "cart.html";
    }
}

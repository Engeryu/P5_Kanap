var str = window.location.href;
var url = new URL(str);
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

        .then(async function (resultatAPI) {
            article = await resultatAPI;
            console.table(article);
            if (article) {
                getPost(article);
            }
        })
        .catch((error) => {
            console.log("Erreur de la requête API");
        })
}

function getPost(article) {
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
        productColors.innerHTML = colors;
    }
    addToCart(article);
}

function addToCart(article) {
    const btn_envoyerPanier = document.querySelector("#addToCart");

    btn_envoyerPanier.addEventListener("click", (event) => {
        if (quantityPicked.value > 0 && quantityPicked.value <= 100 && quantityPicked.value != 0) {

            let choixCouleur = colorPicked.value;

            let choixQuantite = quantityPicked.value;

            let optionsProduit = {
                idProduit: idProduct,
                couleurProduit: choixCouleur,
                quantiteProduit: Number(choixQuantite),
                nomProduit: article.name,
                prixProduit: article.price,
                descriptionProduit: article.description,
                imgProduit: article.imageUrl,
                altImgProduit: article.altTxt
            };

            let itemLocalStorage = JSON.parse(localStorage.getItem("produit"));

            const popupConfirmation = () => {
                if (window.confirm(`Votre commande de ${choixQuantite} ${article.name} ${choixCouleur} est ajoutée au panier
Pour consulter votre panier, cliquez sur OK`)) {
                    window.location.href = "cart.html";
                }
            }

            if (itemLocalStorage) {
                const resultFind = itemLocalStorage.find(
                    (el) => el.idProduit === idProduct && el.couleurProduit === choixCouleur);
                if (resultFind) {
                    let newQuantite =
                        parseInt(optionsProduit.quantiteProduit) + parseInt(resultFind.quantiteProduit);
                    resultFind.quantiteProduit = newQuantite;
                    localStorage.setItem("produit", JSON.stringify(itemLocalStorage));
                    console.table(itemLocalStorage);
                    popupConfirmation();
                } else {
                    itemLocalStorage.push(optionsProduit);
                    localStorage.setItem("produit", JSON.stringify(itemLocalStorage));
                    console.table(itemLocalStorage);
                    popupConfirmation();
                }
            } else {
                itemLocalStorage = [];
                itemLocalStorage.push(optionsProduit);
                localStorage.setItem("produit", JSON.stringify(itemLocalStorage));
                console.table(itemLocalStorage);
                popupConfirmation();
            }
        }
    });
}
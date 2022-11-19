"use strict";

let productLS = JSON.parse(localStorage.getItem("produit"))
const positionEmptyCart = document.getElementById("cart__items")

if (productLS === null || productLS == 0) {
    const emptyCart = `<p>Votre panier est vide</p>`
    positionEmptyCart.innerHTML = emptyCart
} else {
    let productTotalQty = document.getElementById('totalQuantity')
    let totalQty = 0
    let productTotalPrice = document.getElementById('totalPrice')
    let totalPrice = 0
    for (let produit of productLS) {
        fetch("http://localhost:3000/api/products/" + produit.idProduit)
            .then((res) => {
                return res.json();
            })

            .then((data) => {
                data['quantiteProduit'] = produit.quantiteProduit;
                data['couleurProduit'] = produit.couleurProduit;
                console.log(data)
                displayCartProduct(data)
            
                totalQty += produit.quantiteProduit
                totalPrice += produit.quantiteProduit * data.price
                productTotalQty.innerHTML = totalQty            
                productTotalPrice.innerHTML = totalPrice

            })
            .catch((error) => {
                console.log("Erreur de la requête API");
            })

    }
}

function displayCartProduct(produit) {
    let productArticle = document.createElement("article")
    positionEmptyCart.appendChild(productArticle)
    productArticle.className = "cart__item"
    productArticle.setAttribute('data-id', produit._id)

    let productDivImg = document.createElement("div")
    productArticle.appendChild(productDivImg)
    productDivImg.className = "cart__item__img"

    let productImg = document.createElement("img")
    productDivImg.appendChild(productImg)
    productImg.src = produit.imageUrl
    productImg.alt = produit.altTxt

    let productItemContent = document.createElement("div")
    productArticle.appendChild(productItemContent)
    productItemContent.className = "cart__item__content"

    let productItemContentTitlePrice = document.createElement("div")
    productItemContent.appendChild(productItemContentTitlePrice)
    productItemContentTitlePrice.className = "cart__item__content__titlePrice"

    let productTitle = document.createElement("h2")
    productItemContentTitlePrice.appendChild(productTitle)
    productTitle.innerHTML = produit.name

    let productColor = document.createElement("p")
    productTitle.appendChild(productColor)
    productColor.innerHTML = produit.couleurProduit
    productColor.style.fontSize = "20px"

    let productPrice = document.createElement("p")
    productItemContentTitlePrice.appendChild(productPrice)
    productPrice.innerHTML = produit.price + " €"

    let productItemContentSettings = document.createElement("div")
    productItemContent.appendChild(productItemContentSettings)
    productItemContentSettings.className = "cart__item__content__settings"

    let productItemContentSettingsQuantity = document.createElement("div")
    productItemContentSettings.appendChild(productItemContentSettingsQuantity)
    productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity"

    let productQte = document.createElement("p")
    productItemContentSettingsQuantity.appendChild(productQte)
    productQte.innerHTML = "Qté : "

    let productQuantity = document.createElement("input")
    productItemContentSettingsQuantity.appendChild(productQuantity)
    productQuantity.value = produit.quantiteProduit
    productQuantity.className = "itemQuantity"
    productQuantity.setAttribute("type", "number")
    productQuantity.setAttribute("min", "1")
    productQuantity.setAttribute("max", "100")
    productQuantity.setAttribute("name", "itemQuantity")
    productQuantity.addEventListener("change", (event) => {
        event.preventDefault()
        let qttModif = document.getElementsByClassName("itemQuantity")

        for (let k = 0; k < qttModif.length; k++) {
            qttModif[k]

            let quantityModif = productLS[k].quantiteProduit
            let qttModifValue = qttModif[k].valueAsNumber

            const resultFind = productLS.find((element) => element.qttModifValue !== quantityModif)

            resultFind.quantiteProduit = qttModifValue
            productLS[k].quantiteProduit = resultFind.quantiteProduit

            localStorage.setItem("produit", JSON.stringify(productLS))

            location.reload()
        }
    })

    let productItemContentSettingsDelete = document.createElement("div")
    productItemContentSettings.appendChild(productItemContentSettingsDelete)
    productItemContentSettingsDelete.className = "cart__item__content__settings__delete"

    let productSupprimer = document.createElement("p")
    productItemContentSettingsDelete.appendChild(productSupprimer)
    productSupprimer.className = "deleteItem"
    productSupprimer.innerHTML = "Supprimer"
    productSupprimer.addEventListener("click", (event) => {
        let btn_supprimer = document.getElementsByClassName("deleteItem")
        for (let j = 0; j < btn_supprimer.length; j++) {
            event.preventDefault()

            let idDelete = productLS[j].idProduit
            let colorDelete = productLS[j].couleurProduit

            productLS = productLS.filter(element => element.idProduit !== idDelete || element.couleurProduit !== colorDelete)

            localStorage.setItem("produit", JSON.stringify(productLS))

            alert("Ce produit a bien été supprimé du panier")
            location.reload()
        }
    })
}
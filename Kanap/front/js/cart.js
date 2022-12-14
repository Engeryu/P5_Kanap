"use strict";
const positionEmptyCart = document.getElementById("cart__items")

function readCart() {
    let productLS = JSON.parse(localStorage.getItem("produit"))

    if (productLS === null || productLS == 0) {
        const emptyCart = `<p>Votre panier est vide</p>`
        positionEmptyCart.innerHTML = emptyCart
    } else {
        positionEmptyCart.innerHTML = ''
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

                    totalQty += parseInt(produit.quantiteProduit)
                    totalPrice += produit.quantiteProduit * data.price
                    productTotalQty.innerHTML = totalQty
                    productTotalPrice.innerHTML = totalPrice

                })
                .catch((error) => {
                    console.log("Erreur de la requête API : " + error);
                })

        }
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
    productQuantity.addEventListener("change", function($event) {
        $event.preventDefault()
        
        if (productQuantity.value > 0 && productQuantity.value <= 100) {
            updateCart(produit._id, produit.couleurProduit, productQuantity.value)
        } else {
                alert("votre sélection est invalide !")
                productQuantity.value = produit.quantiteProduit
            }
    })
    
let productItemContentSettingsDelete = document.createElement("div")
productItemContentSettings.appendChild(productItemContentSettingsDelete)
productItemContentSettingsDelete.className = "cart__item__content__settings__delete"

let productDelete = document.createElement("p")
productItemContentSettingsDelete.appendChild(productDelete)
productDelete.className = "deleteItem"
productDelete.innerHTML = "Supprimer"
productDelete.addEventListener("click", (event) => {
    deleteCart(produit._id, produit.couleurProduit)
    })
}

function updateCart(id, couleur, qty) {
    let cart = JSON.parse(localStorage.getItem('produit'))
    for (let index in cart) {
        if (cart[index].idProduit == id && cart[index].couleurProduit == couleur) {
            cart[index].quantiteProduit = qty
        } 
    }
    localStorage.setItem('produit', JSON.stringify(cart))
    readCart()
}

function deleteCart(id, couleur) {
    let cart = JSON.parse(localStorage.getItem('produit'))
    for (let index in cart) {
        if (cart[index].idProduit == id && cart[index].couleurProduit == couleur) {
            cart.splice(index, 1)
        } 
    }
    localStorage.setItem('produit', JSON.stringify(cart))
    readCart()

}

readCart()
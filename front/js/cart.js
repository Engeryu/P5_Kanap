let produitLocalStorage = JSON.parse(localStorage.getItem("produit"))
console.table(produitLocalStorage)
const positionEmptyCart = document.getElementById("cart__items")

function getCart() {
    if (produitLocalStorage === null || produitLocalStorage == 0) {
        const emptyCart = `<p>Votre panier est vide</p>`
        positionEmptyCart.innerHTML = emptyCart
    } else {
        for (let produit in produitLocalStorage) {
            let productArticle = document.createElement("article")
            document.getElementById("cart__items").appendChild(productArticle)
            productArticle.className = "cart__item"
            productArticle.setAttribute('data-id', produitLocalStorage[produit].idProduit)

            let productDivImg = document.createElement("div")
            productArticle.appendChild(productDivImg)
            productDivImg.className = "cart__item__img"

            let productImg = document.createElement("img")
            productDivImg.appendChild(productImg)
            productImg.src = produitLocalStorage[produit].imgProduit
            productImg.alt = produitLocalStorage[produit].altImgProduit

            let productItemContent = document.createElement("div")
            productArticle.appendChild(productItemContent)
            productItemContent.className = "cart__item__content"

            let productItemContentTitlePrice = document.createElement("div")
            productItemContent.appendChild(productItemContentTitlePrice)
            productItemContentTitlePrice.className = "cart__item__content__titlePrice"

            let productTitle = document.createElement("h2")
            productItemContentTitlePrice.appendChild(productTitle)
            productTitle.innerHTML = produitLocalStorage[produit].nomProduit

            let productColor = document.createElement("p")
            productTitle.appendChild(productColor)
            productColor.innerHTML = produitLocalStorage[produit].couleurProduit
            productColor.style.fontSize = "20px"

            let productPrice = document.createElement("p")
            productItemContentTitlePrice.appendChild(productPrice)
            productPrice.innerHTML = produitLocalStorage[produit].prixProduit + " €"

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
            productQuantity.value = produitLocalStorage[produit].quantiteProduit
            productQuantity.className = "itemQuantity"
            productQuantity.setAttribute("type", "number")
            productQuantity.setAttribute("min", "1")
            productQuantity.setAttribute("max", "100")
            productQuantity.setAttribute("name", "itemQuantity")

            let productItemContentSettingsDelete = document.createElement("div")
            productItemContentSettings.appendChild(productItemContentSettingsDelete)
            productItemContentSettingsDelete.className = "cart__item__content__settings__delete"

            let productSupprimer = document.createElement("p")
            productItemContentSettingsDelete.appendChild(productSupprimer)
            productSupprimer.className = "deleteItem"
            productSupprimer.innerHTML = "Supprimer"
        }
    }
}
getCart()

function getTotals() {

    var elemsQtt = document.getElementsByClassName('itemQuantity')
    var myLength = elemsQtt.length,
        totalQtt = 0

    for (var i = 0; i < myLength; ++i) {
        totalQtt += elemsQtt[i].valueAsNumber
    }

    let productTotalQuantity = document.getElementById('totalQuantity')
    productTotalQuantity.innerHTML = totalQtt
    console.log(totalQtt)

    totalPrice = 0

    for (var i = 0; i < myLength; ++i) {
        totalPrice += (elemsQtt[i].valueAsNumber * produitLocalStorage[i].prixProduit)
    }

    let productTotalPrice = document.getElementById('totalPrice')
    productTotalPrice.innerHTML = totalPrice
    console.log(totalPrice)
}
getTotals()

function modifyQtt() {
    let qttModif = document.getElementsByClassName("itemQuantity")

    for (let k = 0; k < qttModif.length; k++) {
        qttModif[k].addEventListener("change", (event) => {
            event.preventDefault()

            let quantityModif = produitLocalStorage[k].quantiteProduit
            let qttModifValue = qttModif[k].valueAsNumber

            const resultFind = produitLocalStorage.find((element) => element.qttModifValue !== quantityModif)

            resultFind.quantiteProduit = qttModifValue
            produitLocalStorage[k].quantiteProduit = resultFind.quantiteProduit

            localStorage.setItem("produit", JSON.stringify(produitLocalStorage))

            location.reload()
        })
    }
}
modifyQtt()

function deleteProduct() {
    let btn_supprimer = document.getElementsByClassName("deleteItem")

    for (let j = 0; j < btn_supprimer.length; j++) {
        btn_supprimer[j].addEventListener("click", (event) => {
            event.preventDefault()

            let idDelete = produitLocalStorage[j].idProduit
            let colorDelete = produitLocalStorage[j].couleurProduit

            produitLocalStorage = produitLocalStorage.filter(element => element.idProduit !== idDelete || element.couleurProduit !== colorDelete)

            localStorage.setItem("produit", JSON.stringify(produitLocalStorage))

            alert("Ce produit a bien été supprimé du panier")
            location.reload()
        })
    }
}
deleteProduct()

function getForm() {
    let form = document.getElementsByClassName("cart__order__form")

    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$')
    let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$")
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+")

    form.firstName.addEventListener('change', function () {
        validFirstName(this)
    })

    form.lastName.addEventListener('change', function () {
        validLastName(this)
    })

    form.address.addEventListener('change', function () {
        validAddress(this)
    })

    form.city.addEventListener('change', function () {
        validCity(this)
    })

    form.email.addEventListener('change', function () {
        validEmail(this)
    })

    const validFirstName = function (inputFirstName) {
        let firstNameErrorMsg = inputFirstName.nextElementSibling

        if (charRegExp.test(inputFirstName.value)) {
            firstNameErrorMsg.innerHTML = ''
        } else {
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.'
        }
    }

    const validLastName = function (inputLastName) {
        let lastNameErrorMsg = inputLastName.nextElementSibling

        if (charRegExp.test(inputLastName.value)) {
            lastNameErrorMsg.innerHTML = ''
        } else {
            lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.'
        }
    }

    const validAddress = function (inputAddress) {
        let addressErrorMsg = inputAddress.nextElementSibling

        if (addressRegExp.test(inputAddress.value)) {
            addressErrorMsg.innerHTML = ''
        } else {
            addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.'
        }
    }

    const validCity = function (inputCity) {
        let cityErrorMsg = inputCity.nextElementSibling

        if (charRegExp.test(inputCity.value)) {
            cityErrorMsg.innerHTML = ''
        } else {
            cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.'
        }
    }

    const validEmail = function (inputEmail) {
        let emailErrorMsg = inputEmail.nextElementSibling

        if (emailRegExp.test(inputEmail.value)) {
            emailErrorMsg.innerHTML = ''
        } else {
            emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.'
        }
    }
}
getForm()

function postForm() {
    const btn_commander = document.getElementById("order")

    btn_commander.addEventListener("click", (event) => {

        let inputName = document.getElementById('firstName')
        let inputLastName = document.getElementById('lastName')
        let inputAdress = document.getElementById('address')
        let inputCity = document.getElementById('city')
        let inputMail = document.getElementById('email')

        let idProducts = []
        for (let i = 0; i < produitLocalStorage.length; i++) {
            idProducts.push(produitLocalStorage[i].idProduit)
        }
        console.log(idProducts)

        const order = {
            contact: {
                firstName: inputName.value,
                lastName: inputLastName.value,
                address: inputAdress.value,
                city: inputCity.value,
                email: inputMail.value,
            },
            products: idProducts,
        }

        const options = {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
        }

        fetch("http://localhost:3000/api/products/order", options)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                localStorage.clear()
                localStorage.setItem("orderId", data.orderId)

                document.location.href = "confirmation.html"
            })
            .catch((err) => {
                alert("Problème avec fetch : " + err.message)
            })
    })
}
postForm()
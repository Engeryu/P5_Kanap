"use strict";

function postForm() {
    const order = document.getElementById('order');
    order.addEventListener('click', (event) => {
        event.preventDefault();
        const contact = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            email: document.getElementById('email').value
        }

        validControl(contact)

        if (productLS == null) {
            alert("Pour passer commande, veuillez ajouter des produits à votre panier");
            event.preventDefault();
        } else if (firstName.value === "" || lastName.value === "" || address.value === "" || city.value === "" || email.value === "") {
            alert("Vous devez renseigner vos coordonnées pour passer la commande !");
            event.preventDefault();
        } else {
            productLS = [];
            for (let produit of productLS) {
                productLS.push(produit.idProduit);
            }

            let order = {
                contact: contact,
                products: productLS
            }

            fetch("http://localhost:3000/api/products/order", {
                method: 'POST',
                body: JSON.stringify(order),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
                .then((response) => response.json())
                .then(async function (resultOrder) {
                    order = await resultOrder;
                    localStorage.clear();
                    document.location.href = "confirmation.html?orderId=" + order.orderId;
                })
        }
    });
}

postForm();


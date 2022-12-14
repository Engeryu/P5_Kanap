"use strict";

fillSection();

async function getArticles() {
    var articlesCatch = await fetch("http://localhost:3000/api/products")
    return await articlesCatch.json();
}

async function fillSection() {
    var result = await getArticles()
        .then(function (res) {
            const articles = res;
            console.table(articles);
            for (let article in articles) {

                let productLink = document.createElement("a");
                document.querySelector(".items").appendChild(productLink);
                productLink.href = `product.html?id=${res[article]._id}`;

                let productArticle = document.createElement("article");
                productLink.appendChild(productArticle);

                let productImg = document.createElement("img");
                productArticle.appendChild(productImg);
                productImg.src = res[article].imageUrl;
                productImg.alt = res[article].altTxt;

                let productName = document.createElement("h3");
                productArticle.appendChild(productName);
                productName.classList.add("productName");
                productName.innerHTML = res[article].name;

                let productDescription = document.createElement("p");
                productArticle.appendChild(productDescription);
                productDescription.classList.add("productName");
                productDescription.innerHTML = res[article].description;
            }
        })
        .catch(function (error) {
            return error;
        });
}
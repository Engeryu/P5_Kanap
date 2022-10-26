const host = "http://localhost:3000/";
const getUrl = host + "api/products/";
let cardsFetch = function () {
  fetch(getUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let productSection = document.getElementById("items");

      for (i = 0; i < data.length; i++) {
        displayList(data[i], productSection)
      }
    });
};
cardsFetch();


function displayList(product, productSection) {
  let linkTag = document.createElement('a')
  linkTag.href = './product.html?id=' + product._id

  let articleTag = document.createElement('article')

  let imgTag = document.createElement('img')
  imgTag.src = product.imageUrl
  imgTag.alt = product.altTxt

  let productName = document.createElement('h3')
  productName.innerText = product.name

  let descProduct = document.createElement('p')
  descProduct.innerText = product.description

  productSection.appendChild(linkTag)
  linkTag.appendChild(articleTag)
  articleTag.appendChild(imgTag)
  articleTag.appendChild(productName)
  articleTag.appendChild(descProduct)
}
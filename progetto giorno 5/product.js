document.addEventListener("DOMContentLoaded", function () {
  const parametri = new URLSearchParams(window.location.search);
  const brand = parametri.get("brand");

  if (brand) {
    filterCards(brand);
  }
});

let carrello = [];

function addToCart(product) {
  carrello.push(product);
  console.log("Prodotto aggiunto al carrello:", product);
}

function removeFromCart(product) {
  const index = carrello.indexOf(product);
  if (index !== -1) {
    carrello.splice(index, 1);
    console.log("Prodotto rimosso dal carrello:", product);
  } else {
    console.log("Il prodotto non è presente nel carrello.");
  }
}

function handleDropdownClick(brand) {
  // Cambia l'URL completo senza ricaricare la pagina
  window.location.href = `index.html?brand=${brand}`;

  // Richiama la funzione filterCards(brand) dopo il reindirizzamento
  window.addEventListener("DOMContentLoaded", function () {
    filterCards(brand);
  });
}

const parametri = new URLSearchParams(window.location.search);
const id = parametri.get("id");

const url = "https://striveschool-api.herokuapp.com/api/product/" + id;
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTczMzY5OWZlMDMxZTAwMTliYTE3ODIiLCJpYXQiOjE3MDIwNDk0MzMsImV4cCI6MTcwMzI1OTAzM30.8M9NXzf9FES_YQHHH32fs1QZQliyVf7STWb2PUhwouo";

let responseObj;

fetch(url, {
  headers: {
    Authorization: token,
  },
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
  .then((data) => {
    responseObj = data;
    const { imageUrl, brand, name, description, price } = responseObj;
    let mainDiv = document.getElementById("target");
    mainDiv.innerHTML = `
      <div class="container">
        <div id="mainContainer" class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3 my-3"></div>
      </div>
      <div class="d-flex justify-content-center align-items-center">
        <div class="card text-center p-4 mx-0">
          <h1 class="display-3 mb-4">${name}</h1>
          <img src="${imageUrl}" class="img-fluid custom-image-class align-self-center" alt="...">
          <p class="lead">${description}</p>
          <h3 class="display-5 text-primary mb-4">${price ? price + "€" : "Evento gratuito"}</h3>
          <button class="btn btn-success mt-4" onclick="addToCart('${responseObj._id}')">Aggiungi al carrello</button>
          <button class="btn btn-danger mt-4" onclick="removeFromCart('${
            responseObj._id
          }')">Rimuovi dal carrello</button>
        </div>
      </div>
    `;
  })
  .catch((err) => console.log(err));

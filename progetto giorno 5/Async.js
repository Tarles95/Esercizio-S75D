const url = "https://striveschool-api.herokuapp.com/api/product/";
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTczMzY5OWZlMDMxZTAwMTliYTE3ODIiLCJpYXQiOjE3MDIwNDk0MzMsImV4cCI6MTcwMzI1OTAzM30.8M9NXzf9FES_YQHHH32fs1QZQliyVf7STWb2PUhwouo";

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
  .then((arrayResponseObj) => {
    let container = document.getElementById("mainContainer");
    arrayResponseObj.forEach((product) => {
      let newDiv = document.createElement("div");
      newDiv.innerHTML = `
  <div class="card h-100" data-brand="${product.brand}">
    <img src="${product.imageUrl}" class="card-img-top" alt="...">
    <div class="card-body ${developerMode ? "developer-mode" : ""}">
      <h5 class="card-title">${product.name}</h5>
      <p class="card-text">${product.description} € ${product.price}</p>
      <a href="./product.html?id=${product._id}" class="btn btn-success mb-2">Acquista</a>
      <a href="./product.html?id=${product._id}" class="btn btn-primary mb-2">Maggiori informazioni</a>
      <a href="./backoffice.html" class="btn btn-danger mb-2 btn-developer">Modifica</a>
      <a href="backoffice.html" class="btn btn-dark mb-2 btn-developer">Elimina</a>
    </div>
  </div>
`;

      container.appendChild(newDiv);
    });
  })
  .catch((err) => console.log(err));

function filterCards(brand) {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    const cardBrand = card.getAttribute("data-brand");
    if (cardBrand !== brand) {
      card.style.display = "none";
    } else {
      card.style.display = "block";
    }
  });
}
function removeBrandFilter() {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.delete("brand");
  const newUrl = window.location.pathname + "?" + urlParams.toString();
  window.location.href = newUrl;
}
let developerMode = false;

function toggleDeveloperMode() {
  const body = document.body;
  developerMode = !developerMode;
  body.classList.toggle("developer-mode", developerMode);
  updateButtonsVisibility();
}

function updateButtonsVisibility() {
  const cardBodies = document.querySelectorAll(".card-body");
  cardBodies.forEach((cardBody) => {
    if (developerMode) {
      cardBody.classList.add("developer-mode");
    } else {
      cardBody.classList.remove("developer-mode");
    }
  });
}

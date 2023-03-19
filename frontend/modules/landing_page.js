import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description

  let cities = await fetchCities();
  //Updates the DOM with the cities
  if (cities) {
    var retvalueHTML = "";
    cities.forEach((key) => {
       addCityToDOM(
        key.id,
        key.city,
        key.description,
        key.image
      );
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    const response = await fetch("http://43.205.168.252:8082/cities");
    return response.json();
  } catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  //const divCreate=document.createElement('div');
  const content = `<div class="col-12 col-sm-6 col-lg-3 mb-4">
  <a href="pages/adventures/"></a>
  <div class="tile">
    <div class="tile-text text-center">
      <h5>${city}</h5>
      <p>${description}</p>
    </div>
    <img src=${image} class="img-fluid" alt="" />
  </div>
</div>`;
document.getElementById("data").innerHTML += content;
}

export { init, fetchCities, addCityToDOM };

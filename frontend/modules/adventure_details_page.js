import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const params = new Proxy(new URLSearchParams(search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  let value = params.adventure;
  // Place holder for functionality to work in the Stubs
  return value;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    const url =
      config.backendEndpoint + "/adventures/detail?adventure=" + adventureId;
    const response = await fetch(url);
    return await response.json();
  } catch {
    return null;
  }
  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  document.getElementById("adventure-name").innerHTML = adventure.name;
  document.getElementById("adventure-subtitle").innerHTML = adventure.subtitle;
  document.getElementById("adventure-content").innerHTML = adventure.content;
  var divElement = document.getElementById("photo-gallery");
  for (let adventures of adventure.images) {
    var ImgTag = document.createElement("img");
    ImgTag.src = adventures;
    ImgTag.className = "activity-card-image";
    divElement.appendChild(ImgTag);
  }
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  var divCarousel = document.getElementsByClassName("carousel-inner")[0];
  var divSlider = document.getElementsByClassName("carousel-indicators")[0];
  images.forEach((element, i) => {
    debugger;
    var card;
    var divCreate = document.createElement("div");
    var ImgTag = document.createElement("img");
    ImgTag.className = "activity-card-image";
    ImgTag.src = element;
    if (i == 0) {
      divCreate.className = "carousel-item active";
    } else {
      divCreate.className = "carousel-item";
    }
    divCreate.appendChild(ImgTag);
    divCarousel.appendChild(divCreate);
  });
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if (adventure.available === true) {
    document.getElementById("reservation-panel-sold-out").style.display =
      "none";
    document.getElementById("reservation-panel-available").style.display =
      "block";
    document.getElementById("reservation-person-cost").innerHTML =
      adventure.costPerHead;
  } else {
    document.getElementById("reservation-panel-sold-out").style.display =
      "block";
    document.getElementById("reservation-panel-available").style.display =
      "none";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  var costPerHead = adventure.costPerHead;
  var totalPersons = persons;
  var total = costPerHead * totalPersons;
  document.getElementById("reservation-cost").innerHTML = total;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".

  document.addEventListener("submit", function (event) {
    debugger;
    event.preventDefault();
    var id = adventure.id;
    var objectVal = JSON.stringify(Object.fromEntries(new FormData(myForm)));
    var myJsonObject = JSON.parse(objectVal);
    myJsonObject.adventure = adventure.id;
    myJsonObject = JSON.stringify(myJsonObject);
    var url = config.backendEndpoint + "/reservations/new";
    fetch(url, {
      method: "POST",
      body: myJsonObject,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(function (response) {
        if (response.ok) {
          alert("Success!");
          window.location.reload();
        }
      })
      .catch(function (error) {
        alert("Failed!");
      });
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved==true){
     document.getElementById("reserved-banner").style.display='block';
  }
  else{
    document.getElementById("reserved-banner").style.display='none';
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};

function attachEvents() {

    const inputElement = document.querySelector("#location");
    let buttonElement = document.querySelector("#submit");

    const url = `http://localhost:3030/jsonstore/forecaster/locations`;

    const response = fetch(url);

    console.log(response);





}

attachEvents();
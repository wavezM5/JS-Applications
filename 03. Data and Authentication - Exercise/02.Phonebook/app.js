const url = `http://localhost:3030/jsonstore/phonebook`;

const ul = document.querySelector("#phonebook");
const personInput = document.querySelector("#person");
const phoneInput = document.querySelector("#phone");

let loadButton = document.querySelector("#btnLoad")
let createButton = document.querySelector("#btnCreate");

function attachEvents() {
    loadButton.addEventListener('click', loadButtonFunc);
    createButton.addEventListener('click', createButtonFunc);
}

attachEvents();


async function loadButtonFunc() {
    ul.innerHTML = ''; //to refresh the list, otherwise se naslagva   <=>   ul.replaceChildren();

    const response = await fetch(url);
    const data = await response.json();

    for (const obj of Object.values(data)) {
        //console.log(obj); // .person , .phone , ._id 

        const li = createElement('li', `${obj.person}: ${obj.phone}`, ul);
        li.setAttribute('id', obj._id);

        let deleteButton = createElement('button', 'Delete', li);
        deleteButton.setAttribute('id', 'btnDelete');
        deleteButton.addEventListener('click', deleteButtonFunc);
    }
}

async function deleteButtonFunc(event) {
    const id = event.target.parentNode.id;
    //event.target.parentNode.remove(); tva ako ne e komentirano i judge gurmi qko :D::D:D
 
    const deleteResponse = await fetch(`${url}/${id}`, {
        method: 'DELETE'
    });

}

async function createButtonFunc() {
    if (personInput.value !== '' && phoneInput.value !== '') {

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ person: personInput.value, phone: phoneInput.value })
        });

        loadButton.click();

        personInput.value = '';
        phoneInput.value = '';
    }
}

function createElement(type, text, parent) {
    let element = document.createElement(type);

    element.textContent = text; //if(text) ?

    parent.appendChild(element);

    return element;
}
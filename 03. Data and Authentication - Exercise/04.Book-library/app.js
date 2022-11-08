const url = `http://localhost:3030/jsonstore/collections/books`;

let loadAllBooksButton = document.querySelector("#loadBooks");
let table = document.querySelector("body > table > tbody");
let submitButton = document.querySelector("body > form > button");
let titleInput = document.getElementsByName('title')[0];
let authorInput = document.getElementsByName('author')[0];
let h3Edit = document.querySelector("body > form > h3");

function solve() {

    loadAllBooksButton.addEventListener('click', loadAllFunction);
    submitButton.addEventListener('click', submitFunction);
}

solve();

async function loadAllFunction() {
    table.innerHTML = '';
    h3Edit.textContent = 'FORM';
    submitButton.textContent = 'Submit';

    const response = await fetch(url);
    const data = await response.json();

    for (const [key, obj] of Object.entries(data)) {

        let tr = createElement('tr', '', table);
        tr.setAttribute('id', key);

        let td1 = createElement('td', obj.title, tr);
        let td2 = createElement('td', obj.author, tr);
        let td3 = createElement('td', '', tr);

        let buttonEdit = createElement('button', 'Edit', td3);
        buttonEdit.addEventListener('click', editFunction);

        let buttonDelete = createElement('button', 'Delete', td3);
        buttonDelete.addEventListener('click', deleteButtonFunc);
    }
}

async function submitFunction(event) {
    event.preventDefault();

    if (titleInput.value == '' || authorInput.value == '') {
        //alert('input something...');
    }
    else {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                author: authorInput.value,
                title: titleInput.value
            })
        });

        authorInput.value = '';
        titleInput.value = '';

        loadAllBooksButton.click();
    }
}


async function deleteButtonFunc(event) {
    let id = event.target.parentNode.parentNode.id;
    event.target.parentNode.parentNode.remove(); // 

    const deleteResponse = await fetch(`${url}/${id}`, {
        method: 'DELETE'
    });
}

async function editFunction(event) {

    h3Edit.textContent = 'Edit FORM';

    let id = event.target.parentNode.parentNode.id;
    let title = event.target.parentNode.parentNode.children[0].textContent;
    let author = event.target.parentNode.parentNode.children[1].textContent;

    titleInput.value = title;
    authorInput.value = author;

    await fetch(`${url}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            title : titleInput.value, 
            author : authorInput.value
        })
    })

    submitButton.textContent = 'Save';

    event.target.parentNode.children[1].click();
}


function createElement(type, text, parent) {
    const elem = document.createElement(type);

    if (text) {
        elem.textContent = text;
    }
    if (parent) {
        parent.appendChild(elem);
    }

    return elem;
}


import { html, render } from '../node_modules/lit-html/lit-html.js';

const main = document.querySelector('div');

const url = `http://localhost:3030/jsonstore/advanced/dropdown`;

async function getOptions() {
    const response = await fetch(url);
    return await response.json();
}

const options = Object.values(await getOptions());

const selectTemplate = (data) => html`
<select id="menu">
    ${data.map(el => html`<option value=${el._id}>${el.text}</option>`)}
</select>
`;

update(options);

function update(options) {
    const result = selectTemplate(options);
    render(result, main);
}

document.querySelector('form').addEventListener('submit', addItem); //Add new element

async function addItem(event) {
    event.preventDefault();

    if(document.getElementById('itemText').value == ''){
        return;
    }

    const text = document.getElementById('itemText').value;
  
    const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({text})
    })

    options.push(await response.json());
    update(options);
    
    document.getElementById('itemText').value = '';
}
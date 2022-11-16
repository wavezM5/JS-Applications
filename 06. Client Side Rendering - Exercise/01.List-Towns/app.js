import { html, render } from '../node_modules/lit-html/lit-html.js';

let button = document.querySelector("#btnLoadTowns");
const input = document.querySelector("#towns");
const root = document.querySelector("#root");


const listTemplate = (data) => html`
<ul>
    ${data.map(town => html`<li>${town}</li>`)}
</ul>
`;

button.addEventListener('click', (event) => {
    event.preventDefault(); //?

    if(input.value == '') {
        return;
    }

    let towns = input.value.split(', ');

    let ul = document.createElement('ul');

    const result = listTemplate(towns);

    render(result, root);
   
    input.value = '';
});


// button.addEventListener('click', (event) => {
//     event.preventDefault(); //?

//     let towns = input.value.split(', ');
//     input.value = '';

//     let ul = document.createElement('ul');

//     towns.map(el => {
//         let li = document.createElement('li');
//         li.textContent = el;
//         ul.appendChild(li);
//     })

//     root.appendChild(ul);
// });


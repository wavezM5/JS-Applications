//uslovieto ot softuni e sburkano XD

import { html, render } from '../node_modules/lit-html/lit-html.js';
import { towns } from './towns.js';

const main = document.body;

const searchTemplate = (towns, match) => html`
<article>
   <div id="towns">
      <ul>
         ${towns.map(t => itemTemplate(t, match))}
      </ul>
   </div>
   <input type="text" id="searchText" />
   <button @click = ${search}>Search</button>
   <div id="result">${countMatches(towns, match)}</div>
</article>
`;

const itemTemplate = (name, match) => html`
   <li class=${(match && name.includes(match)) ? 'active' : ''}>${name}</li> 
`; //.toLowerCase()

update();

function update(match) {
   const result = searchTemplate(towns, match);
   render(result, main);
}

function search() {
   const match = document.getElementById('searchText').value;
   update(match);
}

function countMatches(towns, match) {
   const matches = towns.filter(t => match && t.includes(match)); // .toLowerCase()
   return `${matches.length} matches found`;
}
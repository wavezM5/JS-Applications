import { getAllShoes } from '../api/data.js';
import {html} from '../api/lib.js';


const dashboardTemplate=(shoes)=>html
`
<section id="dashboard">
          <h2>Collectibles</h2>
          <ul class="card-wrapper">
           ${shoes.length==0
            ?html`<h2>There are no items added yet.</h2>`
            :html`${shoes.map(dashboardCard)}`}
          </ul>      
        </section>

`


const dashboardCard=(card)=>html
`
<li class="card">
              <img src="${card.imageUrl}" alt="back2future" />
              <p><strong>Brand: </strong><span class="brand">${card.brand}</span></p>
              <p>
                <strong>Model: </strong
                ><span class="model">${card.model}</span>
              </p>
              <p><strong>Value:</strong><span class="value">${card.value}</span>$</p>
              <a class="details-btn" href="/details/${card._id}">Details</a>
            </li>
`

export async function dashboardView(ctx){
    const shoes=await getAllShoes();
    ctx.render(dashboardTemplate(shoes));
}
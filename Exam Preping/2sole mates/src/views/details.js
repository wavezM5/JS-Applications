import { getShoeById } from '../api/data.js';
import {html} from '../api/lib.js';
import { getUserData } from '../api/util.js';

const detailsTemplate=(shoe,currentUser,owner)=>html
`
<section id="details">
          <div id="details-wrapper">
            <p id="details-title">Shoe Details</p>
            <div id="img-wrapper">
              <img src="${shoe.imageUrl}" alt="example1" />
            </div>
            <div id="info-wrapper">
              <p>Brand: <span id="details-brand">${shoe.brand}</span></p>
              <p>
                Model: <span id="details-model">${shoe.model}</span>
              </p>
              <p>Release date: <span id="details-release">${shoe.release}</span></p>
              <p>Designer: <span id="details-designer">${shoe.designer}</span></p>
              <p>Value: <span id="details-value">${shoe.value}</span></p>
            </div>

            ${owner==currentUser
            ?html`<div id="action-buttons">
            <a href="/edit/${shoe._id}" id="edit-btn">Edit</a>
            <a href="/delete/${shoe._id}" id="delete-btn">Delete</a>
          </div>`
            :html``}
          </div>
        </section>
`


export async function detailsView(ctx){
    const id=ctx.params.id;
    const shoe=await getShoeById(id);
    const currentUser=getUserData()==null?'':getUserData().id;
    const owner=shoe._ownerId;
    ctx.render(detailsTemplate(shoe,currentUser,owner));
}
import { getShoeById, updateShoe } from "../api/data.js";
import { hasEmptyFields } from "../api/util.js";
import {html} from '../api/lib.js';


const editTemplate=(shoe,onSubmit)=>html`

<section id="edit">
          <div class="form">
            <h2>Edit item</h2>
            <form @submit=${onSubmit} class="edit-form">
              <input
                type="text"
                name="brand"
                id="shoe-brand"
                placeholder="Brand"
                value="${shoe.brand}"
              />
              <input
                type="text"
                name="model"
                id="shoe-model"
                placeholder="Model"
                value="${shoe.model}"
              />
              <input
                type="text"
                name="imageUrl"
                id="shoe-img"
                placeholder="Image url"
                value="${shoe.imageUrl}"
              />
              <input
                type="text"
                name="release"
                id="shoe-release"
                placeholder="Release date"
                value="${shoe.release}"
              />
              <input
                type="text"
                name="designer"
                id="shoe-designer"
                placeholder="Designer"
                value="${shoe.designer}"
              />
              <input
                type="text"
                name="value"
                id="shoe-value"
                placeholder="Value"
                value="${shoe.value}"
              />

              <button type="submit">post</button>
            </form>
          </div>
        </section>
`

export async function editView(ctx){
    const shoeId=ctx.params.id;
    const shoe=await getShoeById(shoeId);
    ctx.render(editTemplate(shoe,onSubmit));


    async function onSubmit(event){
        event.preventDefault();
        const formData=Object.fromEntries(new FormData(event.target));
        if(hasEmptyFields(formData)){
            return;
        }

        const brand=formData.brand;
        const model=formData.model;
        const image=formData.imageUrl;
        const date=formData.release;
        const designer=formData.designer;
        const value=formData.value;

        await updateShoe(shoeId,brand, model, image, date, designer, value);
        ctx.page.redirect('/')
    }

}
import { hasEmptyFields } from "../api/util.js";
import {html} from '../api/lib.js';
import { postShoes } from "../api/data.js";



const createTemplate=(onSubmit)=>html
`
<section id="create">
          <div class="form">
            <h2>Add item</h2>
            <form @submit=${onSubmit} class="create-form">
              <input
                type="text"
                name="brand"
                id="shoe-brand"
                placeholder="Brand"
              />
              <input
                type="text"
                name="model"
                id="shoe-model"
                placeholder="Model"
              />
              <input
                type="text"
                name="imageUrl"
                id="shoe-img"
                placeholder="Image url"
              />
              <input
                type="text"
                name="release"
                id="shoe-release"
                placeholder="Release date"
              />
              <input
                type="text"
                name="designer"
                id="shoe-designer"
                placeholder="Designer"
              />
              <input
                type="text"
                name="value"
                id="shoe-value"
                placeholder="Value"
              />

              <button type="submit">post</button>
            </form>
          </div>
        </section>
`

export async function createView(ctx){
    ctx.render(createTemplate(onSubmit));

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


        await postShoes( brand,model, image, date, designer, value)
        ctx.page.redirect('/dashboard');
    }
}
import { createRecord } from "../api/data.js";
import { html } from "../api/lib.js";
import { checkEmptyFields } from "../api/util.js";

const createTemplate = (onSubmit) => html`
    <!-- Create Page (Only for logged-in users) -->
    <section id="create">
        <div class="form">
            <h2>Add Album</h2>
            <form @submit=${onSubmit} class="create-form">
                <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" />
                <input type="text" name="album" id="album-album" placeholder="Album" />
                <input type="text" name="imageUrl" id="album-img" placeholder="Image url" />
                <input type="text" name="release" id="album-release" placeholder="Release date" />
                <input type="text" name="label" id="album-label" placeholder="Label" />
                <input type="text" name="sales" id="album-sales" placeholder="Sales" />
    
                <button type="submit">post</button>
            </form>
        </div>
    </section>
`;

export async function createView(ctx) {
    ctx.render(createTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = Object.fromEntries(new FormData(event.target));

        const singer = formData.singer;
        const album = formData.album;
        const imageUrl = formData.imageUrl;
        const release = formData.release;
        const label = formData.label;
        const sales = formData.sales;

        if (checkEmptyFields(singer, album, imageUrl, release, label, sales)) {
            return alert("Fields must not be empty be bratle??!");
        }

        await createRecord(singer, album, imageUrl, release, label, sales);
        ctx.page.redirect("/dashboard");
    }
}

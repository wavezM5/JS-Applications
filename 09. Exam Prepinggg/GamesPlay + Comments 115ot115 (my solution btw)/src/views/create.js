import { createRecord } from "../api/data.js";
import { html } from "../api/lib.js";
import { checkEmptyFields } from "../api/util.js";

const createTemplate = (onSubmit) => html`
<!-- Create Page ( Only for logged-in users ) -->
<section id="create-page" class="auth">
    <form @submit=${onSubmit} id="create">
        <div class="container">
            <h1>Create Game</h1>
            <label for="leg-title">Legendary title:</label>
            <input type="text" id="title" name="title" placeholder="Enter game title..." />

            <label for="category">Category:</label>
            <input type="text" id="category" name="category" placeholder="Enter game category..." />

            <label for="levels">MaxLevel:</label>
            <input type="number" id="maxLevel" name="maxLevel" min="1" placeholder="1" />

            <label for="game-img">Image:</label>
            <input type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo..." />

            <label for="summary">Summary:</label>
            <textarea name="summary" id="summary"></textarea>
            <input class="btn submit" type="submit" value="Create Game" />
        </div>
    </form>
</section>
`;

export async function createView(ctx) {
    ctx.render(createTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = Object.fromEntries(new FormData(event.target));

        const title = formData.title;
        const category = formData.category;
        const maxLevel = formData.maxLevel;
        const imageUrl = formData.imageUrl;
        const summary = formData.summary;

        if (checkEmptyFields(title, category, maxLevel, imageUrl, summary)) {
            return alert("Fields must not be empty!");
        }

        await createRecord(title, category, maxLevel, imageUrl, summary);
        ctx.page.redirect("/");
    }
}

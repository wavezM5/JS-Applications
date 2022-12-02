import { getGameById, updateRecord } from "../api/data.js";
import { html } from "../api/lib.js";
import { checkEmptyFields } from "../api/util.js";

const editTemplate = (game, onSubmit) => html`
<!-- Edit Page ( Only for the creator )-->
<section id="edit-page" class="auth">
    <form @submit=${onSubmit} id="edit">
        <div class="container">
            <h1>Edit Game</h1>
            <label for="leg-title">Legendary title:</label>
            <input type="text" id="title" name="title" value="${game.title}" />

            <label for="category">Category:</label>
            <input type="text" id="category" name="category" value="${game.category}" />

            <label for="levels">MaxLevel:</label>
            <input type="number" id="maxLevel" name="maxLevel" min="1" value="${game.maxLevel}" />

            <label for="game-img">Image:</label>
            <input type="text" id="imageUrl" name="imageUrl" value="${game.imageUrl}" />

            <label for="summary">Summary:</label>
            <textarea name="summary" id="summary">${game.summary}</textarea>
            <input class="btn submit" type="submit" value="Edit Game" />
        </div>
    </form>
</section>
`;

export async function editView(ctx) {
    const id = ctx.params.id;
    const game = await getGameById(id);

    ctx.render(editTemplate(game, onSubmit));

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

        await updateRecord(id, title, category, maxLevel, imageUrl, summary);
        ctx.page.redirect("/details/" + id);
    }
}

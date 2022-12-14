import { getAllGames } from "../api/data.js";
import { html } from "../api/lib.js";

const catalogTemplate = (data) => html`
<!-- Catalogue -->
<section id="catalog-page">
    <h1>All Games</h1>
${data.length == 0
        ? html`<h3 class="no-articles">No articles yet</h3>`
        : html`${data.map(gameTemplate)}`}
    
</section>
`;

const gameTemplate = (game) => html`
<!-- Display div: with information about every game (if any) -->
<div class="allGames">
    <div class="allGames-info">
        <img src="${game.imageUrl}" />
        <h6>${game.category}</h6>
        <h2>${game.title}</h2>
        <a href="/details/${game._id}" class="details-button">Details</a>
    </div>
</div>
`;

export async function catalogView(ctx) {
    const games = await getAllGames();
    ctx.render(catalogTemplate(games));
}

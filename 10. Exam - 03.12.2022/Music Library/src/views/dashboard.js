import { getAllAlbums } from "../api/data.js";
import { html } from "../api/lib.js";

const dashboardTemplate = (data) => html`
<!-- Dashboard page -->
<section id="dashboard">
    <h2>Albums</h2>
    ${data.length == 0
        ? html`
    <!-- Display an h2 if there are no posts -->
    <h2>There are no albums added yet.</h2>
    `
        : html`
    <ul class="card-wrapper">
        ${data.map(albumTemplate)}
    </ul>
    `}
</section>
`;

const albumTemplate = (album) => html`
<!-- Display a li with information about every post (if any)-->
<li class="card">
    <img src="${album.imageUrl}" alt="travis" />
    <p><strong>Singer/Band: </strong><span class="singer">${album.singer}</span></p>
    <p>
        <strong>Album name: </strong><span class="album">${album.album}</span>
    </p>
    <p>
        <strong>Sales:</strong><span class="sales">${album.sales}</span>
    </p>
    <a class="details-btn" href="/details/${album._id}">Details</a>
</li>
`;

export async function dashboardView(ctx) {
    const albums = await getAllAlbums();
    ctx.render(dashboardTemplate(albums));
}

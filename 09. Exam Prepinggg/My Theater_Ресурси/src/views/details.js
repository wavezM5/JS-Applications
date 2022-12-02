import { html, } from "../api/lib.js";
import { getMovieById } from "../api/data.js";
import { getUserData } from "../api/util.js";

const detailsTemplate = (movie, currentUser, owner) => html`
<!--Details Page-->
<section id="detailsPage">
    <div id="detailsBox">
        <div class="detailsInfo">
            <h1>Title: ${movie.title}</h1>
            <div>
                <img src="${movie.imageUrl}" />
            </div>
        </div>

        <div class="details">
            <h3>Theater Description</h3>
            <p>${movie.description}</p>
            <h4>Date: ${movie.date}</h4>
            <h4>Author: ${movie.author}</h4>
            ${currentUser == owner 
            ? html`
            <div class="buttons">
                <a class="btn-delete" href="/delete/${movie._id}">Delete</a>
                <a class="btn-edit" href="/edit/${movie._id}">Edit</a>
                <a class="btn-like" href="/like/${movie._id}">Like</a>
            </div>`
            : html ``}

            <p class="likes">Likes: 0</p>
        </div>
    </div>
</section>
`;

export async function detailsView(ctx) {
    const id = ctx.params.id;
    const movie = await getMovieById(id);
    const currentUser = getUserData().id;
    const owner = movie._ownerId;

    ctx.render(detailsTemplate(movie, currentUser, owner));
}
import { html } from "../api/lib.js";
import { getAlbumById } from "../api/data.js";
import { getUserData } from "../api/util.js";

const detailsTemplate = (album, currentUser, owner) => html`
    <!-- Details page -->
    <section id="details">
        <div id="details-wrapper">
            <p id="details-title">Album Details</p>
            <div id="img-wrapper">
                <img src="./images/BackinBlack.jpeg" alt="example1" />
            </div>
            <div id="info-wrapper">
                <p><strong>Band:</strong><span id="details-singer">${album.singer}</span></p>
                <p>
                    <strong>Album name:</strong><span id="details-album">${album.album}</span>
                </p>
                <p><strong>Release date:</strong><span id="details-release">${album.release}</span></p>
                <p><strong>Label:</strong><span id="details-label">${album.label}</span></p>
                <p><strong>Sales:</strong><span id="details-sales">${album.sales}</span></p>
            </div>
            <div id="likes">Likes: <span id="likes-count">0</span></div>

            <div id="action-buttons">
            ${currentUser == owner ? 
            html`
            <!--Edit and Delete are only for creator-->
                <a href="/edit/${album._id}" id="edit-btn">Edit</a>
                <a href="/delete/${album._id}" id="delete-btn">Delete</a>
            ` : html`
                <a href="/like/${album._id}" id="like-btn">Like</a>
            `}}
            </div>
        </div>
    </section>
`;

export async function detailsView(ctx) {
    const id = ctx.params.id;
    const album = await getAlbumById(id);
    const currentUser = getUserData() ? getUserData().id : "";
    const owner = album._ownerId;

    ctx.render(detailsTemplate(album, currentUser, owner));
}

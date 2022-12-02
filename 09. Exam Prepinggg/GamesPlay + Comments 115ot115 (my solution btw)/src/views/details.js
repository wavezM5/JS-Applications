import { html } from "../api/lib.js";
import { createComment, getGameById, loadAllComments } from "../api/data.js";
import { getUserData, checkEmptyFields } from "../api/util.js";

const detailsTemplate = (onSubmitComment, game, currentUser, owner, comments) => html`
<!--Details Page-->
<section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">
        <div class="game-header">
            <img class="game-img" src="images/MineCraft.png" />
            <h1>${game.title}</h1>
            <span class="levels">MaxLevel: ${game.maxLevel}</span>
            <p class="type">${game.category}</p>
        </div>

        <p class="text">${game.summary}</p>

        <!-- Bonus ( for Guests and Users ) -->
        <div class="details-comments">
            <h2>Comments:</h2>
            ${comments.length == 0 
            ? html`
                <!-- Display paragraph: If there are no games in the database -->
                <p class="no-comment">No comments.</p>`
            : html`
            <ul>
                <!-- list all comments for current game (If any) -->
                ${comments.map(commentTemplate)}
            </ul>
            `}            
        </div>

        ${owner == currentUser
        ? html`
        <!-- Edit/Delete buttons ( Only for creator of this game )  -->
        <div class="buttons">
            <a href="/edit/${game._id}" class="button">Edit</a>
            <a href="/delete/${game._id}" class="button">Delete</a>
        </div>`
        : html``}
    </div>

    ${currentUser && owner != currentUser
      ? html`
    <!-- Bonus -->
    <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
    <article class="create-comment">
        <label>Add new comment:</label>
        <form @submit=${onSubmitComment} class="form">
            <textarea name="comment" placeholder="Comment......"></textarea>
            <input class="btn submit" type="submit" value="Add Comment" />
        </form>
    </article>`
      : html``}
</section>
`;

const commentTemplate = (commentText) => html`
<li class="comment">
    <p>${commentText}</p>
</li>
`;

export async function detailsView(ctx) {
    const id = ctx.params.id;
    const game = await getGameById(id);
    const commentsObject = await loadAllComments(id);
    const comments = commentsObject.map(x => x.comment);
    console.log(comments);
    const currentUser = getUserData() ? getUserData().id : "";
    const owner = game._ownerId;

    ctx.render(detailsTemplate(onSubmitComment, game, currentUser, owner, comments));

    async function onSubmitComment(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const comment = formData.get("comment");

        if (checkEmptyFields(comment)) {
            return alert("COMMENT must be filled !");
        }

        await createComment(id, comment);
        ctx.updateNav();
        ctx.page.redirect(`/details/${id}`);
    }
}

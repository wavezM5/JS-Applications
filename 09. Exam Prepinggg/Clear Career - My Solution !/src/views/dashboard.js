import { getAllOffers } from "../api/data.js";
import { html } from "../api/lib.js";

const dashboardTemplate = (data) => html`
<!-- Dashboard page -->
<section id="dashboard">
    <h2>Job Offers</h2>
    ${data.length == 0 
    ? html`<h2>No offers yet.</h2>`
    : html`${data.map(dataCard)}`}
</section>
`;

const dataCard = (card) => html`
<!-- Display a div with information about every post (if any)-->
<div class="offer">
        <img src="${card.imageUrl}" alt="example1" />
        <p><strong>Title: </strong><span class="title">${card.title}</span></p>
        <p><strong>Salary:</strong><span class="salary">${card.salary}</span></p>
        <a class="details-btn" href="/details/${card._id}">Details</a>
    </div>
`;

export async function dashboardView(ctx) {
    const offers = await getAllOffers();
    ctx.render(dashboardTemplate(offers));
}

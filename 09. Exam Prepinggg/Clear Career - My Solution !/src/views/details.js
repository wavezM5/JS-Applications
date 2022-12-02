import { html } from "../api/lib.js";
import { getOfferById } from "../api/data.js";
import { getUserData } from "../api/util.js";

const detailsTemplate = (offer, currentUser, owner) => html`
<!-- Details page -->
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src="${offer.imageUrl}" alt="example1" />
        <p id="details-title">${offer.title}</p>
        <p id="details-category">
            Category: <span id="categories">${offer.category}</span>
        </p>
        <p id="details-salary">Salary: <span id="salary-number">${offer.salary}</span></p>
        <div id="info-wrapper">
            <div id="details-description">
                <h4>Description</h4>
                <span>${offer.description}</span>
            </div>
            <div id="details-requirements">
                <h4>Requirements</h4>
                <span>${offer.requirements}</span>
            </div>
        </div>
        <p>Applications: <strong id="applications">1</strong></p>

        ${currentUser == owner 
        ? html`
            <!--Edit and Delete are only for creator-->
        <div id="action-buttons">
            <a href="/edit/${offer._id}" id="edit-btn">Edit</a>
            <a href="/delete/${offer._id}" id="delete-btn">Delete</a>

            <!--Bonus - Only for logged-in users ( not authors )-->
            <a href="/apply/${offer._id}" id="apply-btn">Apply</a>
        </div>
        `
        : html`
        <div id="action-buttons">
            <!--Bonus - Only for logged-in users ( not authors )-->
            <a href="" id="apply-btn">Apply</a>
        </div>
        `}}
    </div>
</section>
`;

export async function detailsView(ctx) {
    const id = ctx.params.id;
    const offer = await getOfferById(id);
    const currentUser = getUserData() ? getUserData().id : '';
    const owner = offer._ownerId;

    ctx.render(detailsTemplate(offer, currentUser, owner));
}

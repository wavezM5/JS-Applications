import { getId } from '../api/data.js';
import { page, html, render } from '../api/lib.js';
import { getUserData } from '../api/util.js';

const createTemplate = (jobOffer, loggedId, isCreator) => html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src=${jobOffer.imageUrl} alt="example1" />
        <p id="details-title">${jobOffer.title}</p>
        <p id="details-category">
            Category: <span id="categories">${jobOffer.category}</span>
        </p>
        <p id="details-salary">
            Salary: <span id="salary-number">${jobOffer.salary}</span>
        </p>
        <div id="info-wrapper">
            <div id="details-description">
                <h4>Description</h4>
                <span>${jobOffer.description}</span>
            </div>
            <div id="details-requirements">
                <h4>Requirements</h4>
                <span>${jobOffer.requirements}</span>
            </div>
        </div>
        <p>Applications: <strong id="applications">1</strong></p>

        <!--Edit and Delete are only for creator-->
        ${isCreator == loggedId ? html`
        <div id="action-buttons">
            <a href="/edit/${jobOffer._id}" id="edit-btn">Edit</a>
            <a href="/delete/${jobOffer._id}" id="delete-btn">Delete</a>
        ` : ''};
            <!--Bonus - Only for logged-in users ( not authors )-->
            <a href="" id="apply-btn">Apply</a>
        </div>
    </div>
</section>
`;

export async function detailsView(ctx) {
    let id = ctx.params.id;
    let jobOffer = await getId(id);

    let isCreator = jobOffer._ownerId;
    let loggedId = getUserData().id;

    ctx.render(createTemplate(jobOffer, loggedId, isCreator));
}



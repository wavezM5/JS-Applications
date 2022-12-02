import { getOfferById, updateRecord } from "../api/data.js";
import { html } from "../api/lib.js";
import { checkEmptyFields } from "../api/util.js";

const editTemplate = (offer, onSubmit) => html`
<!-- Edit Page (Only for logged-in users) -->
<section id="edit">
    <div class="form">
        <h2>Edit Offer</h2>
        <form @submit=${onSubmit} class="edit-form">
            <input type="text" name="title" id="job-title" placeholder="Title" value="${offer.title}" />
            <input type="text" name="imageUrl" id="job-logo" placeholder="Company logo url" value="${offer.imageUrl}" />
            <input type="text" name="category" id="job-category" placeholder="Category" value="${offer.category}" />
            <textarea id="job-description" name="description" placeholder="Description" rows="4"
                cols="50">${offer.description}</textarea>
            <textarea id="job-requirements" name="requirements" placeholder="Requirements" rows="4"
                cols="50">${offer.requirements}</textarea>
            <input type="text" name="salary" id="job-salary" placeholder="Salary" value="${offer.salary}" />

            <button type="submit">post</button>
        </form>
    </div>
</section>
`;

export async function editView(ctx) {
    const id = ctx.params.id;
    const offer = await getOfferById(id);

    ctx.render(editTemplate(offer, onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = Object.fromEntries(new FormData(event.target));

        const title = formData.title;
        const imageUrl = formData.imageUrl;
        const category = formData.category;
        const description = formData.description;
        const requirements = formData.requirements;
        const salary = formData.salary;

        if (checkEmptyFields(title, imageUrl, category, description, requirements, salary)) {
            return alert("All fields must not be empty!!!!!");
        }

        await updateRecord(id, title, imageUrl, category, description, requirements, salary);
        ctx.page.redirect("/details/" + id);
    }
}

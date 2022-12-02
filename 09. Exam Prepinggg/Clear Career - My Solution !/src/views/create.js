import { createRecord } from "../api/data.js";
import { html } from "../api/lib.js";
import { checkEmptyFields } from "../api/util.js";

const createTemplate = (onSubmit) => html`
<!-- Create Page (Only for logged-in users) -->
<section id="create">
    <div class="form">
        <h2>Create Offer</h2>
        <form @submit=${onSubmit} class="create-form">
            <input type="text" name="title" id="job-title" placeholder="Title" />
            <input type="text" name="imageUrl" id="job-logo" placeholder="Company logo url" />
            <input type="text" name="category" id="job-category" placeholder="Category" />
            <textarea id="job-description" name="description" placeholder="Description" rows="4" cols="50"></textarea>
            <textarea id="job-requirements" name="requirements" placeholder="Requirements" rows="4"
                cols="50"></textarea>
            <input type="text" name="salary" id="job-salary" placeholder="Salary" />

            <button type="submit">post</button>
        </form>
    </div>
</section>
`;

export async function createView(ctx) {
    ctx.render(createTemplate(onSubmit));

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
            return alert("Fields must not be empty!");
        }

        await createRecord(title, imageUrl, category, description, requirements, salary);
        ctx.page.redirect("/dashboard");
    }
}

import { createOffer } from '../api/data.js';
import { page, html, render } from '../api/lib.js';

const createTemplate = (onSubmit) => html
  `
<section id="create">
  <form @submit=${onSubmit}>
    <div class="form">
      <h2>Create Offer</h2>
      <form class="create-form">
        <input type="text" name="title" id="job-title" placeholder="Title" />
        <input type="text" name="imageUrl" id="job-logo" placeholder="Company logo url" />
        <input type="text" name="category" id="job-category" placeholder="Category" />
        <textarea id="job-description" name="description" placeholder="Description" rows="4" cols="50"></textarea>
        <textarea id="job-requirements" name="requirements" placeholder="Requirements" rows="4" cols="50"></textarea>
        <input type="text" name="salary" id="job-salary" placeholder="Salary" />

        <button type="submit">post</button>
      </form>
    </div>
  </form>
</section>
`;

export async function createView(ctx) {

  ctx.render(createTemplate(onSubmit));

  async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const title = formData.get('title');
    const imageUrl = formData.get('imageUrl');
    const category = formData.get('category');
    const description = formData.get('description');
    const requirements = formData.get('requirements');
    const salary = formData.get('salary');

    if (title == '' || imageUrl == '' || category == '' || description == '' || requirements == '' || salary == '') {
      return alert('all fields must be filled');
    }

    await createOffer(title, imageUrl, category, description, requirements, salary);
    ctx.page.redirect('/dashboard');
  }
}



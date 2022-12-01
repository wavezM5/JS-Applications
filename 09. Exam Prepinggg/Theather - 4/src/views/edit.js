import { getMovieById, updateRecord } from "../api/data.js";
import { html,render,page } from "../api/lib.js";
import { checkEmptyFields } from "../api/util.js";


const editTemplate=(movie,onSubmit)=>html
`
<section id="editPage">
            <form @submit=${onSubmit} class="theater-form">
                <h1>Edit Theater</h1>
                <div>
                    <label for="title">Title:</label>
                    <input id="title" name="title" type="text" placeholder="Theater name" value="${movie.title}">
                </div>
                <div>
                    <label for="date">Date:</label>
                    <input id="date" name="date" type="text" placeholder="Month Day, Year" value="${movie.date}">
                </div>
                <div>
                    <label for="author">Author:</label>
                    <input id="author" name="author" type="text" placeholder="Author"
                        value="${movie.author}">
                </div>
                <div>
                    <label for="description">Theater Description:</label>
                    <textarea id="description" name="description"
                        placeholder="Description">${movie.description}</textarea>
                </div>
                <div>
                    <label for="imageUrl">Image url:</label>
                    <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url"
                        value="${movie.imageUrl}">
                </div>
                <button class="btn" type="submit">Submit</button>
            </form>
        </section>
`

export async function editView(ctx){
    const id=ctx.params.id;
    const movie=await getMovieById(id);
    console.log(movie);
    ctx.render(editTemplate(movie,onSubmit));

    async function onSubmit(event){
        event.preventDefault();
        const formData=Object.fromEntries(new FormData(event.target));
        const title=formData.title;
        const date=formData.date;
        const author=formData.author;
        const description=formData.description;
        const image=formData.imageUrl;

        if(checkEmptyFields(title,date,author,description,image)){
            return alert('All fields must be filled!');
        }
        
        await updateRecord(id,title,date,author,description,image);
        ctx.page.redirect('/details/'+id);
        
    }
}
import { deleteById } from "../api/data.js";

export async function deleteView(ctx) {
    const id = ctx.params.id;
    if (confirm("Are you sure you want to delete this record?")) {
        await deleteById(id);
        ctx.page.redirect('/dashboard'); 
    }
}
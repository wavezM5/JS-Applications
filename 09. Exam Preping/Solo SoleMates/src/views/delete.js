import { deleteById } from "../api/data.js";

export async function deleteView(ctx) {
    const deleteId = ctx.params.id;
    await deleteById(deleteId);
    ctx.page.redirect('/dashboard');
}
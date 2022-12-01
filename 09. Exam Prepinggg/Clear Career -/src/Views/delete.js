import { deleteOffer } from "../api/data.js";

export async function deleteView(ctx) {
  
    deleteOffer(ctx.params.id);
    ctx.page.redirect('/dashboard');
}

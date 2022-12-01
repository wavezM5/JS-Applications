import { deleteById } from "../api/data.js";





export async function deleteView(ctx){
    const id=ctx.params.id;
    if(confirm("Do you wanna delete the current record?")){
        await deleteById(id);
        ctx.page.redirect('/')
    }
}
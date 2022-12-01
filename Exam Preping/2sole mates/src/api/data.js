import { del, get, post, put } from "./api.js";



export async function getAllShoes() {
    const response = await get('/data/shoes?sortBy=_createdOn%20desc');
    return response;
}

export async function getShoeById(id){
    const response=await get('/data/shoes/'+id);
    return response;
}

export async function getShoeByQuery(query){
    const response=await get(`/data/shoes?where=brand%20LIKE%20%22${query}%22`);
    return response;
}

export async function postShoes(brand, model, imageUrl, release, designer, value) {
    const response = await post('/data/shoes', {brand, model, imageUrl, release, designer, value});
    return response;
}

export async function updateShoe(id,brand, model, imageUrl, release, designer, value){
    const response=await put(`/data/shoes/${id}`,{brand, model, imageUrl, release, designer, value});
    return response;
}

export async function deleteById(id){
    const response=await del('/data/shoes/'+id);
    return response;
}
import { } from './lib.js'
import { post, put, del, get } from './api.js'


export async function getAllTheathers() {
    const response = await get('/data/theaters?sortBy=_createdOn%20desc&distinct=title');
    return response;
}

export async function getMovieById(id) {
    const response = await get('/data/theaters/' + id);
    return response;
}

export async function getProfileById(id){
    const response=await get(`/data/theaters?where=_ownerId%3D%22${id}%22&sortBy=_createdOn%20desc`);
    return response;
}

export async function createRecord(title, date, author, imageUrl, description) {
    const response = await post('/data/theaters', { title, date, author, imageUrl, description });
    return response;
}

export async function updateRecord(id,title,date,author,description,imageUrl) {
    const response = await put(`/data/theaters/${id}`,{title,date,author,description,imageUrl});
    return response;
}

export async function deleteById(id){
    const response=await del('/data/theaters/'+id);
    return response;
}

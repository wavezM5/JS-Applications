//Zaqvki funkcii
import { post, put, del, get } from './api.js'

export async function getAllOffers() {
    const response = await get('/data/offers?sortBy=_createdOn%20desc');
    return response;
}

export async function getOfferById(id) {
    const response = await get('/data/offers/' + id);
    return response;
}

export async function createRecord(title, imageUrl, category, description, requirements, salary) {
    const response = await post('/data/offers/', { title, imageUrl, category, description, requirements, salary });
    return response;
}

export async function updateRecord(id, title, imageUrl, category, description, requirements, salary) {
    const response = await put(`/data/offers/${id}`, { title, imageUrl, category, description, requirements, salary });
    return response;
}

export async function deleteById(id) {
    const response = await del('/data/offers/' + id);
    return response;
}
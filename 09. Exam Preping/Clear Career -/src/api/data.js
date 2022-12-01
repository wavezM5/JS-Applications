import { del, get, post } from "./api.js";


export async function getAllJobOffers() {
    const response = get('/data/offers?sortBy=_createdOn%20desc');
    return response;
}


export async function createOffer(title, imageUrl, category, description, requirements, salary) {
    const response = post('/data/offers', { title, imageUrl, category, description, requirements, salary });
    return response;
}

export async function getId(id) {
    const response = get('/data/offers/' + id);
    return response;
}

export async function deleteOffer(id) {
    const response = del('/data/offers/' + id);
    return response;
}
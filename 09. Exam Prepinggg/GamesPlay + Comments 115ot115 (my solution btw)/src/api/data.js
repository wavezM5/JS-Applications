//Zaqvki funkcii wagmi
import { post, put, del, get } from './api.js'

export async function getAllGames() {
    const response = await get('/data/games?sortBy=_createdOn%20desc');
    return response;
}

export async function getRecentGames() {
    const response = await get('/data/games?sortBy=_createdOn%20desc&distinct=category');
    return response;
}

export async function getGameById(id) {
    const response = await get('/data/games/' + id);
    return response;
}

export async function createRecord(title, category, maxLevel, imageUrl, summary) {
    const response = await post('/data/games', { title, category, maxLevel, imageUrl, summary }); //  ?  /
    return response;
}

export async function updateRecord(id, title, category, maxLevel, imageUrl, summary) {
    const response = await put(`/data/games/${id}`, { title, category, maxLevel, imageUrl, summary });
    return response;
}

export async function deleteById(id) {
    const response = await del('/data/games/' + id);
    return response;
}

export async function loadAllComments(gameId) {
    const response = await get(`/data/comments?where=gameId%3D%22${gameId}%22`);
    return response;
}

export async function createComment(gameId, comment) {
    const response = await post('/data/comments', { gameId, comment }); //  ?  /
    return response;
}
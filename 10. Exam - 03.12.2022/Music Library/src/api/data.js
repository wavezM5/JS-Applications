import { post, put, del, get } from './api.js'
//wagmi
export async function getAllAlbums() {
    const response = await get('/data/albums?sortBy=_createdOn%20desc');
    return response;
}

export async function getAlbumById(id) {
    const response = await get('/data/albums/' + id);
    return response;
}

export async function createRecord(singer, album, imageUrl, release, label, sales ) {
    const response = await post('/data/albums', { singer, album, imageUrl, release, label, sales }); //  ?  /
    return response;
}

export async function updateRecord(id, singer, album, imageUrl, release, label, sales ) {
    const response = await put(`/data/albums/${id}`, { singer, album, imageUrl, release, label, sales });
    return response;
}

export async function deleteById(id) {
    const response = await del('/data/albums/' + id);
    return response;
}
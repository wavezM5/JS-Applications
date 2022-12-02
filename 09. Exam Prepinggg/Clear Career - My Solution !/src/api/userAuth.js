import { get, post } from "./api.js";
import { clearUserData, setUserData } from "./util.js";

export async function login(email, password) {
    const response = await post('/users/login', { email, password });
    const user = {
        id: response._id,
        email: response.email,
        accessToken: response.accessToken,
    }
    setUserData(user);
    return response;
}

export async function register(email, password) {
    const response = await post('/users/register', { email, password });
    const user = {
        id: response._id,
        email: response.email,
        accessToken: response.accessToken,
    }
    setUserData(user);
    return response;
}

export function logout() {
    get('/users/logout');
    clearUserData();
}
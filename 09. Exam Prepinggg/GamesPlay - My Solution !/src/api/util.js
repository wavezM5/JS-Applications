export function getUserData() {
    return JSON.parse(sessionStorage.getItem('userData'));
}
export function setUserData(data) {
    return sessionStorage.setItem('userData', JSON.stringify(data));
}
export function clearUserData() {
    return sessionStorage.removeItem('userData');
}

export function checkEmptyFields(...fields) {
    if (fields.some(element => element == '')) {
        return true;
    }
    return false;
}
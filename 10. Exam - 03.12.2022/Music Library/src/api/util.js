export function getUserData() {
    return JSON.parse(sessionStorage.getItem('userData'));
}
export function setUserData(data) {
    return sessionStorage.setItem('userData', JSON.stringify(data));
}
export function clearUserData() {
    return sessionStorage.removeItem('userData');
}

export function checkEmptyFields(...parametersWAGMI) {
    if (parametersWAGMI.some(k => k == '')) {
        return true;
    }
    return false;
}
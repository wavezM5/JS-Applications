export function getUserData() {
    return JSON.parse(sessionStorage.getItem('userData'));
}
export function setUserData(data) {
    return sessionStorage.setItem('userData', JSON.stringify(data));
}
export function clearUserData() {
    return sessionStorage.removeItem('userData');
}

export function hasEmptyFields(fields) {
    const valueFields = Object.values(fields);
    for (let value of valueFields) {
        if (value == '') {
            alert('All fields must be filled');
            return true;
        }
    }
    return false;
}
export function getUserData() {
    return JSON.parse(localStorage.getItem('user'))
}

export function getAccessToken() {
    let user = getUserData();
    if(user) {
        return user.accessToken;
    } else {
        return null;
    }
}

export function clearUserData() {
    localStorage.removeItem('user')
}

export function setUserData(data) {
    localStorage.setItem('user', JSON.stringify(data))
}

export function createSubmitHandler(ctx, handler) {
    return function (event) {
        event.preventDefault()
        let formData = Object.entries(new FormData(event.target))
        handler(ctx, formData, event)
    }
}
export function getUserData(){
    return JSON.parse(sessionStorage.getItem('userData'));
}

export function setUserData(data){
    return sessionStorage.setItem('userData',JSON.stringify(data));
}

export function removeUserData(){
    return sessionStorage.removeItem('userData');
}
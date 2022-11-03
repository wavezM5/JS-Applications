async function lockedProfile() { //75/100, cuz some bug in judge :D

    const url = `http://localhost:3030/jsonstore/advanced/profiles`;
    let mainDiv = document.querySelector("#main");
    mainDiv.replaceChildren();  // Remove example user

    const response = await fetch(url);
    if (!response.ok || response.status != 200) {
        throw new Error('Invalid request');
    }

    const data = await response.json();  // Data that contains the users

    for (let currInfo of Object.values(data)) { //  {currInfo} : _id , username , age , email

        let divProfile = createElement('div', 'profile', '');
        let img = createElement('img', 'userIcon', '');
        img.setAttribute('src', './iconProfile2.png');
        let labelLock = createElement('label', '', 'Lock');
        let inputLock = createElement('input');
        inputLock.type = 'radio';
        inputLock.name = 'userLocked';
        inputLock.checked = true;
        inputLock.value = 'lock';
        let labelUnlock = createElement('label', '', 'Unlock');
        let inputUnlock = createElement('input');
        inputUnlock.type = 'radio';
        inputUnlock.name = 'userLocked'; //
        inputUnlock.value = 'unlock';
        let br = createElement('br');
        let hr1 = document.createElement('hr');
        let labelUsername = createElement('label', '', 'Username');
        let inputUsername = createElement('input');
        inputUsername.value = `${currInfo.username}`;
        inputUsername.type = 'text';
        inputUsername.name = 'userUsername';
        inputUsername.disabled = true;
        inputUsername.readOnly = true;

        let divHidden = document.createElement('div');
        divHidden.id = `userHiddenFields`;//
        divHidden.style.display = 'none';
        let hr2 = document.createElement('hr');
        let labelEmail = createElement('label', '', 'Email:');
        let inputEmail = createElement('input');
        inputEmail.type = 'email';
        inputEmail.name = `userEmail`; //
        inputEmail.value = `${currInfo.email}`;
        inputEmail.disabled = true;
        inputEmail.readOnly = true;
        let labelAge = createElement('label', '', 'Age:');
        let inputAge = createElement('input');
        inputAge.type = 'email'; //
        inputAge.name = `userAge`; //
        inputAge.value = `${currInfo.age}`;
        inputAge.disabled = true;
        inputAge.readOnly = true;

        let buttonShowMore = createElement('button', '', 'Show more');
        let buttonHideIt = createElement('button', '', 'Hide it');

        buttonShowMore.addEventListener('click', (event) => {
            if (inputUnlock.checked) {
                divHidden.style.display = 'block';
                divProfile.removeChild(event.currentTarget);
                divProfile.appendChild(buttonHideIt);
            }
        });

        buttonHideIt.addEventListener('click', (event) => {
            if (inputUnlock.checked) {
                divHidden.style.display = 'none';
                divProfile.removeChild(event.currentTarget);
                divProfile.appendChild(buttonShowMore);
            }
        });

        divProfile.appendChild(img);
        divProfile.appendChild(labelLock);
        divProfile.appendChild(inputLock);
        divProfile.appendChild(labelUnlock);
        divProfile.appendChild(inputUnlock);
        divProfile.appendChild(br);
        divProfile.appendChild(hr1);
        divProfile.appendChild(labelUsername);
        divProfile.appendChild(inputUsername);

        divHidden.appendChild(hr2);
        divHidden.appendChild(labelEmail);
        divHidden.appendChild(inputEmail);
        divHidden.appendChild(labelAge);
        divHidden.appendChild(inputAge);

        divProfile.appendChild(divHidden);

        divProfile.appendChild(buttonShowMore);

        mainDiv.appendChild(divProfile);
    }


    function createElement(type, className, text) { //maybe needs refactoring?
        const el = document.createElement(type);
        if (className) {
            el.classList.add(className);
        }
        if (text) {
            el.textContent = text;
        }
        return el;
    }

}
const url = `http://localhost:3030/jsonstore/messenger`;
const messages = document.querySelector("#messages");

function attachEvents() {
    document.querySelector("#submit").addEventListener('click', postMessage);
    document.querySelector("#refresh").addEventListener('click', loadAllMessages);
}
attachEvents();

async function loadAllMessages() {
    const response = await fetch(url);
    const data = await response.json();

    messages.textContent = ''; //messages.value ?

    let result = [];

    for (const obj of Object.values(data)) {
        result.push(`${obj.author}: ${obj.content}`); 
    }

    messages.textContent = result.join('\n'); //messages.value ?
}

async function postMessage() {

    const author = document.querySelector("#controls > input[type=text]:nth-child(2)");  //Copy JS Path xd
    const content = document.querySelector("#controls > input[type=text]:nth-child(5)");

    if (author.value === '' || content.value === '') {
        alert('You must provide a author and content!!!!!!!!o ye wagmi');
    }
    else {
        let obj = {
            author: author.value,
            content: content.value
        };

        await request(url, obj);

        author.value = '';
        content.value = '';
    }
}

async function request(url, option) {
    if (option) {
        option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(option)
        };
    }

    const response = await fetch(url, option);

    return response.json();
}

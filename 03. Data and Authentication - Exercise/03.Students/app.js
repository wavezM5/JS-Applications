const url = `http://localhost:3030/jsonstore/collections/students`;

const submitButton = document.querySelector("#submit");
const table = document.querySelector("#results > tbody");

function solve() {

    getInitialResponse();

    submitButton.addEventListener('click', sumbitButtonFunction);
}

solve();

async function getInitialResponse() {

    const response = await fetch(url);
    const data = await response.json();

    for (const obj of Object.values(data)) {
        //console.log(obj); // .facultyNumber , .firstName , .lastName , .grade , ._id

        let firstName = obj.firstName;
        let lastName = obj.lastName;
        let facultyNumber = obj.facultyNumber;
        let grade = Number(obj.grade); //
        //let id = obj._id; <=> na key-a koito e na obecta mai 

        let tr = document.createElement('tr');

        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        let td4 = document.createElement('td');

        td1.textContent = firstName;
        td2.textContent = lastName;
        td3.textContent = facultyNumber;
        td4.textContent = grade;

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        table.appendChild(tr);
    }
}

async function sumbitButtonFunction(event) {
    event.preventDefault(); //

    let firstNameInputElement = document.getElementsByName('firstName')[0];
    let lastNameInputElement = document.getElementsByName('lastName')[0];
    let facultyNumberInputElement = document.getElementsByName('facultyNumber')[0];
    let gradeInputElement = document.getElementsByName('grade')[0];

    if (firstNameInputElement.value == '' || lastNameInputElement.value == ''
        || facultyNumberInputElement.value == '' || gradeInputElement.value == ''
        || isNaN(gradeInputElement.value) || isNaN(facultyNumberInputElement.value)) {
        alert('error data wagmi we bratle');
    }
    else {
        //console.log('ok');

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstName: firstNameInputElement.value,
                lastName: lastNameInputElement.value,
                facultyNumber: facultyNumberInputElement.value, //
                grade: gradeInputElement.value //
            })
        });

        let tr = document.createElement('tr');
        
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        let td4 = document.createElement('td');

        td1.textContent = firstNameInputElement.value;
        td2.textContent = lastNameInputElement.value;
        td3.textContent = facultyNumberInputElement.value; //
        td4.textContent = gradeInputElement.value; //

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        table.appendChild(tr);

        firstNameInputElement.value = '';
        lastNameInputElement.value = '';
        facultyNumberInputElement.value = '';
        gradeInputElement.value = '';
    }

}


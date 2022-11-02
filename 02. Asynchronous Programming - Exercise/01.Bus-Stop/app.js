async function getInfo() {  //async function?

    const stopNameElement = document.getElementById('stopName');
    const busesListElement = document.getElementById('buses');
    const stopId = document.getElementById('stopId').value;

    try {
        busesListElement.replaceChildren();
        stopNameElement.textContent = 'LOADING ... ';

        const url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`;
        const response = await fetch(url);

        if (response.status !== 200) {
            throw new Error('Stop ID not found');
        }

        const data = await response.json(); //console.log(data);

        stopNameElement.textContent = data.name;

        Object.entries(data.buses).forEach(b => {
            //console.log(b);
            const li = document.createElement('li');
            li.textContent = `Bus ${b[0]} arrives in ${b[0]} minutes`;

            busesListElement.appendChild(li);
        });

    }
    catch (error) {
        stopNameElement.textContent = 'Error';
    }

}
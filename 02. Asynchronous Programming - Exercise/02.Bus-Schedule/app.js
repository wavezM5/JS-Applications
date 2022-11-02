function solve() {

    const label = document.querySelector("#info > span");
    const departButton = document.getElementById('depart');
    const arriveButton = document.getElementById('arrive');

    let stop = {
        name: 'depotName',
        next: 'depot' //nextId
    };

    async function depart() {
        departButton.disabled = true;

        const url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`;
        const response = await fetch(url);
        if (response.status != 200) {
            throw new Error(`error...`);
        }

        stop = await response.json(); //<=> Object.assign(stop, await response.json());

        label.textContent = `Next stop ${stop.name}`;
        arriveButton.disabled = false;
    }

    function arrive() {
        arriveButton.disabled = true;
        label.textContent = `Arriving at ${stop.name}`;
        departButton.disabled = false;
    }

    return { depart, arrive };
}

let result = solve();
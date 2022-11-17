export function search() {

    let input = document.querySelector("#searchField").value;
    document.querySelector("#searchField").value = '';

    let tableRows = document.querySelector("body > table > tbody").children;

    for (const row of tableRows) {
        row.classList.remove('select');

        if(row.textContent.toLowerCase().includes(input.toLowerCase())) {
            row.classList.add('select');
        }
    }
}
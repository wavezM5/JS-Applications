async function solution() {

    const main = document.getElementById('main');

    const url = `http://localhost:3030/jsonstore/advanced/articles/list`;

    const response = await fetch(url);
    const data = await response.json();

    data.forEach(a => {

        let divAccordion = createElement('div', '', ['class', 'accordion']);
        let divHead = createElement('div', '', ['class', 'head']);
        let span = createElement('span', a.title);
        let button = createElement('button', 'More', ['class', 'button', 'id', a._id]);
        button.addEventListener('click', toggle);
        let divExtra = createElement('div', '', ['class', 'extra']);
        let p = createElement('p');
        
        
        divHead.appendChild(span);
        divHead.appendChild(button);
        divAccordion.appendChild(divHead);  
        divAccordion.appendChild(divExtra); 
        divExtra.appendChild(p);
        main.appendChild(divAccordion);
    });

    function createElement(type, content, attributes = []) {
        const element = document.createElement(type);

        if (content) {
            element.textContent = content;
        }

        if (attributes.length > 0) {
            for (let i = 0; i < attributes.length; i += 2) {
                element.setAttribute(attributes[i], attributes[i + 1]);
            }
        }

        return element;
    }

    async function toggle(event) {

        const accordion = event.target.parentElement.parentElement;
        const extra = accordion.children[1];
        const p = extra.children[0];

        const id = event.target.id;
        const url = `http://localhost:3030/jsonstore/advanced/articles/details/${id}`;
        const response = await fetch(url);
        const data = await response.json();

        p.textContent = data.content;

        const hidden = event.target.textContent === 'More';
        extra.style.display = hidden ? 'block' : 'none';
        event.target.textContent = hidden ? 'Less' : 'More';
    }

}

solution();
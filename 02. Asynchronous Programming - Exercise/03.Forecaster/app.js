async function attachEvents() {

    const inputElement = document.querySelector("#location")
    let buttonElement = document.querySelector("#submit");
    let forecastDiv = document.querySelector("#forecast");
    let currentDiv = document.querySelector("#current");
    let threeDayDiv = document.querySelector("#upcoming > div");

    const url = `http://localhost:3030/jsonstore/forecaster/locations`;
    const response = await fetch(url);
    const data = await response.json();

    let codeToSearchFor = 'a';
    let degreeSign = '°';

    buttonElement.addEventListener('click', async () => {

        for (let element of data) {
            if (inputElement.value == element.name) {
                codeToSearchFor = element.code;
            }
        }

        const url2 = `http://localhost:3030/jsonstore/forecaster/today/${codeToSearchFor}`;
        const response2 = await fetch(url2);
        const data2 = await response2.json();

        const url3 = `http://localhost:3030/jsonstore/forecaster/upcoming/${codeToSearchFor}`;
        const response3 = await fetch(url3);
        const data3 = await response3.json();

        inputHTML_1(data2);
        inputHTML_2(data3);
    });

    function inputHTML_1(data2) {
        forecastDiv.style.display = 'block';

        let divForecast = createElement('div', '', ['class', 'forecasts']);
        let span = createElement('span', getSymbol(data2.forecast.condition), ['class', 'condition']);
        span.classList.add('symbol');
        let span2 = createElement('span', '', ['class', 'condition']);

        let span3 = createElement('span', data2.name, ['class', 'forecast-data']);
        let span4 = createElement('span', `${data2.forecast.low}${degreeSign}/${data2.forecast.high}${degreeSign}`, ['class', 'forecast-data']);
        let span5 = createElement('span', data2.forecast.condition, ['class', 'forecast-data']);

        span2.appendChild(span3);
        span2.appendChild(span4);
        span2.appendChild(span5);
        divForecast.appendChild(span);
        divForecast.appendChild(span2);
        currentDiv.appendChild(divForecast);
    }


    function inputHTML_2(data3) {

        let div = createElement('div', '', ['class', 'forecast-info']);

        for (let i = 0; i < 3; i++) {

            let span = createElement('span', '', ['class', 'upcoming']);
            let span2 = createElement('span', getSymbol(data3.forecast[i].condition), ['class', 'symbol']);
            let span3 = createElement('span', `${data3.forecast[i].low}${degreeSign}/${data3.forecast[i].high}${degreeSign}`, ['class', 'forecast-data']);
            let span4 = createElement('span', data3.forecast[i].condition, ['class', 'forecast-data']);

            span.appendChild(span2);
            span.appendChild(span3);
            span.appendChild(span4);
            div.appendChild(span);
        }

        threeDayDiv.appendChild(div);
    }


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

    function getSymbol(word) {
        if (word == 'Sunny') {
            return '☀';
        }
        else if (word == 'Partly sunny') {
            return '⛅';
        }
        else if (word == 'Overcast') {
            return '☁';
        }
        else if (word == 'Rain') {
            return '☂';
        }
        else {
            throw new Error('Error!!!!?????');
        }
    }

}

attachEvents();


// function createEl(type, className, text) {
//     const el = document.createElement(type);
//     if (className) {
//         el.classList.add(className);
//     }
//     if (text) {
//         el.textContent = text;
//     }
//     return el;
// }
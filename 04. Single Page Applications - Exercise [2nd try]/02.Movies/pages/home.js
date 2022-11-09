let section = undefined;

function initialize(domElement) {
    section = domElement;
}

async function getView() {
    return section;
}

let homePage = {
    initialize,
    getView
};

export default homePage;
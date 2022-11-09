let section = undefined;

function initialize(domElement) {
    section = domElement;
}

async function getView() {
    return section;
}


let loginPage = {
    initialize,
    getView
};

export default loginPage;
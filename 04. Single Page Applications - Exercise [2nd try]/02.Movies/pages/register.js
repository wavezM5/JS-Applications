let section = undefined;

function initialize(domElement) {
    section = domElement;
}

async function getView() {
    return section;
}



let registerPage = {
    initialize,
    getView
};

export default registerPage;
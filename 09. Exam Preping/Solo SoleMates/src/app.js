import { html, render, page } from './api/lib.js';
import { getUserData } from './api/util.js';
import { createView } from './views/create.js';
import { dashboardView } from './views/dashboard.js';
import { deleteView } from './views/delete.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { homeView } from './views/home.js';
import { loginView } from './views/login.js';
import { logoutView } from './views/logout.js';
import { registerView } from './views/register.js';
import { searchPage } from './views/search.js';

const main = document.getElementById('main');

updateNav();
page(decorator);
page('/', homeView);
page('/dashboard', dashboardView);
page('/login', loginView);
page('/register', registerView);
page('/logout', logoutView);
page('/create', createView);
page('/details/:id', detailsView);
page('/edit/:id', editView);
page('/delete/:id', deleteView);
page('/search/', searchPage);



function decorator(ctx, next) {
    ctx.render = renderMain;
    ctx.updateNav = updateNav;
    next();
}
function renderMain(context) {
    render(context, main);
}
function updateNav() {
    const user = document.querySelector('.user');
    const guest = document.querySelector('.guest');
    const loggedUser = getUserData();
    if (loggedUser) {
        user.style.display = 'block';
        guest.style.display = 'none';
    }
    else {
        user.style.display = 'none';
        guest.style.display = 'block';
    }
}



page.start()
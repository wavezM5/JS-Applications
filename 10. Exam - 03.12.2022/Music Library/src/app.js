import { render, page } from './api/lib.js';
import { getUserData } from './api/util.js';
import { loginView } from './views/login.js';
import { logoutView } from './views/logout.js';
import { registerView } from './views/register.js';
import { dashboardView } from './views/dashboard.js';
import { createView } from './views/create.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { deleteView } from './views/delete.js';

const main = document.getElementById('content');

updateNav();
page(decorator);
page('/login', loginView);
page('/register', registerView);
page('/logout', logoutView);
page('/dashboard', dashboardView);
page('/create', createView);
page('/details/:id', detailsView);
page('/edit/:id', editView);
page('/delete/:id', deleteView);

//Wagmi
function updateNav() {
    const user = document.querySelectorAll('.user');
    const guest = document.querySelectorAll('.guest');
    const userData = getUserData();
    if (userData) {
        user.forEach(el => el.style.display = 'inline-block');
        guest.forEach(el => el.style.display = 'none');
    }
    else {
        user.forEach(el => el.style.display = 'none');
        guest.forEach(el => el.style.display = 'inline-block');
    }
}

function decorator(ctx, next) {
    ctx.render = renderMain;
    ctx.updateNav = updateNav;
    next();
}
function renderMain(context) {
    render(context, main);
}

page.start();
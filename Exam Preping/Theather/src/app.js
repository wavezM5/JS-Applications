import { html, render, page } from './api/lib.js';
import * as user from './api/userAuth.js';
import { getUserData } from './api/util.js';
import { createView } from './views/create.js';
import { deleteView } from './views/delete.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { homeView } from './views/home.js';
import { loginView } from './views/login.js';
import { logoutView } from './views/logout.js';
import { profileView } from './views/profile.js';
import { registerView } from './views/register.js';

const main = document.getElementById('content');
updateNav();
page(decorator);
page('/', homeView);
page('/profile', profileView);
page('/login', loginView);
page('/register', registerView);
page('/logout', logoutView);
page('/create', createView);
page('/details/:id', detailsView)
page('/edit/:id', editView);
page('/delete/:id', deleteView);


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
window.user = user;
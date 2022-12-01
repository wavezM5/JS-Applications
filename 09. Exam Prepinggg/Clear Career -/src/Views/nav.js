import { html, render, page } from '../api/lib.js';
import { logout } from '../api/user.js';
import { getUserData } from '../util.js';

const nav = document.querySelector('header'); //parent

const navTemplate = (hasUser) => html`
<!-- Navigation -->
<a id="logo" href="/"
  ><img id="logo-img" src="./images/logo.jpg" alt=""
/></a>

<nav>
  <div>
    <a href="/dashboard">Dashboard</a>
  </div>

  <!-- Logged-in users -->
  <div class="user">
    <a href="/create">Create Offer</a>
    <a href="/logout">Logout</a>
  </div>

  <!-- Guest users -->
  <div class="guest">
    <a href="/login">Login</a>
    <a href="/register">Register</a>
  </div>
</nav>`;


export function updateNav() {
    const user = getUserData();

    render(navTemplate(user), nav);
}

function onLogout() { 
    logout();
    updateNav();
    page.redirect('/');
}


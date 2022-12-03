import { logout } from "../api/userAuth.js";

export async function logoutView(ctx) {
    logout();
    ctx.updateNav();
    ctx.page.redirect('/');
}
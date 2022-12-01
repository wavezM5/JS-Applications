import { html, render, page } from "../api/lib.js";
import { register } from "../api/userAuth.js";
import { checkEmptyFields } from "../api/util.js";

const registerTemplate = (onSubmit) => html
    `
<section id="registerPage">
    <form @submit=${onSubmit} class="registerForm">
        <h2>Register</h2>
        <div class="on-dark">
            <label for="email">Email:</label>
            <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
        </div>

        <div class="on-dark">
            <label for="password">Password:</label>
            <input id="password" name="password" type="password" placeholder="********" value="">
        </div>

        <div class="on-dark">
            <label for="repeatPassword">Repeat Password:</label>
            <input id="repeatPassword" name="repeatPassword" type="password" placeholder="********" value="">
        </div>

        <button class="btn" type="submit">Register</button>

        <p class="field">
            <span>If you have profile click <a href="#">here</a></span>
        </p>
    </form>
</section>
`


export async function registerView(ctx) {
    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = Object.fromEntries(new FormData(event.target));
        const email = formData.email;
        const password = formData.password;
        const repeatPassword = formData.repeatPassword;

        if (checkEmptyFields(email, password, repeatPassword)) {
            return alert('All fields must be filled!');
        }
        if (password != repeatPassword) {
            return alert('Passwords must be the same!');
        }
        await register(email, password);
        ctx.updateNav();
        ctx.page.redirect('/');
    }
}
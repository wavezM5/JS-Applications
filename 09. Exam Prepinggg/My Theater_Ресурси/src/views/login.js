import { html } from "../api/lib.js";
import { login } from "../api/userAuth.js";
import { checkEmptyFields } from "../api/util.js";

const loginTemplate = (onSubmit) => html`
        <!--Login Page-->
        <section id="loginaPage">
            <form @submit=${onSubmit} class="loginForm">
                <h2>Login</h2>
                <div>
                    <label for="email">Email:</label>
                    <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
                </div>
                <div>
                    <label for="password">Password:</label>
                    <input id="password" name="password" type="password" placeholder="********" value="">
                </div>
        
                <button class="btn" type="submit">Login</button>
        
                <p class="field">
                    <span>If you don't have profile click <a href="#">here</a></span>
                </p>
            </form>
        </section>
`;

export async function loginView(ctx) {
    ctx.render(loginTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = Object.fromEntries(new FormData(event.target));
        const email = formData.email;
        const password = formData.password;

        if (checkEmptyFields(email, password)) {
            return alert("All fields must not be empty!!");
        }

        await login(email, password);
        ctx.updateNav();
        ctx.page.redirect('/');
    }
}
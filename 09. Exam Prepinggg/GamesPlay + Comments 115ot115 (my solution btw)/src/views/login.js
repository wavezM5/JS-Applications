import { html } from "../api/lib.js";
import { login } from "../api/userAuth.js";
import { checkEmptyFields } from "../api/util.js";

const loginTemplate = (onSubmit) => html`
<!-- Login Page ( Only for Guest users ) -->
<section id="login-page" class="auth">
    <form @submit=${onSubmit} id="login">
        <div class="container">
            <div class="brand-logo"></div>
            <h1>Login</h1>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Sokka@gmail.com" />

            <label for="login-pass">Password:</label>
            <input type="password" id="login-password" name="password" />
            <input type="submit" class="btn submit" value="Login" />
            <p class="field">
                <span>If you don't have profile click <a href="/register">here</a></span>
            </p>
        </div>
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
        ctx.page.redirect("/");
    }
}

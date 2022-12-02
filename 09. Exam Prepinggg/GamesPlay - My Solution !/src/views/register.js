import { html } from "../api/lib.js";
import { register } from "../api/userAuth.js";
import { checkEmptyFields } from "../api/util.js";

const registerTemplate = (onSubmit) => html`
<!-- Register Page ( Only for Guest users ) -->
<section id="register-page" class="content auth">
    <form @submit=${onSubmit} id="register">
        <div class="container">
            <div class="brand-logo"></div>
            <h1>Register</h1>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="maria@email.com" />

            <label for="pass">Password:</label>
            <input type="password" name="password" id="register-password" />

            <label for="con-pass">Confirm Password:</label>
            <input type="password" name="confirm-password" id="confirm-password" />

            <input class="btn submit" type="submit" value="Register" />

            <p class="field">
                <span>If you already have profile click <a href="/login">here</a></span>
            </p>
        </div>
    </form>
</section>
`;

export async function registerView(ctx) {
    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const email = formData.get("email");
        const password = formData.get("password");
        const repeatPassword = formData.get("confirm-password");

        if (checkEmptyFields(email, password, repeatPassword)) {
            return alert("All fields must not be empty!!!");
        }
        if (password != repeatPassword) {
            return alert("Passowrds do not match!");
        }

        await register(email, password);
        ctx.updateNav();
        ctx.page.redirect("/");
    }
}

import { html } from "../api/lib.js";
import { register } from "../api/userAuth.js";
import { checkEmptyFields } from "../api/util.js";

const registerTemplate = (onSubmit) => html`
<!-- Register Page (Only for Guest users) -->
<section id="register">
    <div class="form">
        <h2>Register</h2>
        <form @submit=${onSubmit} class="login-form">
            <input type="text" name="email" id="register-email" placeholder="email" />
            <input type="password" name="password" id="register-password" placeholder="password" />
            <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
            <button type="submit">register</button>
            <p class="message">Already registered? <a href="/login">Login</a></p>
        </form>
    </div>
</section>
`;

export async function registerView(ctx) {
    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const email = formData.get("email");
        const password = formData.get("password");
        const repeatPassword = formData.get("re-password");

        if (checkEmptyFields(email, password, repeatPassword)) {
            return alert("ama popylni vsichko be pi4");
        }
        if (password != repeatPassword) {
            return alert("E brao.. parolite ne sa ednakwi e lud");
        }

        await register(email, password);
        ctx.updateNav();
        ctx.page.redirect("/dashboard");
    }
}

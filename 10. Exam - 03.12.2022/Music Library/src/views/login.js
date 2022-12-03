import { html } from "../api/lib.js";
import { login } from "../api/userAuth.js";
import { checkEmptyFields } from "../api/util.js";

const loginTemplate = (onSubmit) => html`
    <!-- Login Page (Only for Guest users) -->
    <section id="login">
        <div class="form">
            <h2>Login</h2>
            <form @submit=${onSubmit} class="login-form">
                <input type="text" name="email" id="email" placeholder="email" />
                <input type="password" name="password" id="password" placeholder="password" />
                <button type="submit">login</button>
                <p class="message">
                    Not registered? <a href="#">Create an account</a>
                </p>
            </form>
        </div>
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
            return alert("ama popylvai gi tiq polenca ti kaam e");
        }

        await login(email, password);
        ctx.updateNav();
        ctx.page.redirect("/dashboard");
    }
}

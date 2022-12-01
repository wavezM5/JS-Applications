import {html} from '../api/lib.js';
import { register } from '../api/userAuth.js';
import { hasEmptyFields } from '../api/util.js';

const registerTemplate=(onSubmit)=>html
`
<section id="register">
          <div class="form">
            <h2>Register</h2>
            <form @submit=${onSubmit} class="login-form">
              <input
                type="text"
                name="email"
                id="register-email"
                placeholder="email"
              />
              <input
                type="password"
                name="password"
                id="register-password"
                placeholder="password"
              />
              <input
                type="password"
                name="re-password"
                id="repeat-password"
                placeholder="repeat password"
              />
              <button type="submit">login</button>
              <p class="message">Already registered? <a href="/login">Login</a></p>
            </form>
          </div>
        </section>
`

export async function registerView(ctx){
    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(event){
        event.preventDefault();

        const formData=Object.fromEntries(new FormData(event.target));
        if(hasEmptyFields(formData)){
            return;
        }

        const email=formData.email;
        const password=formData.password;
        const repeatPassword=formData['re-password'];
        
        if(password!==repeatPassword){
            return alert('Passwords do not match');
        }

        await register(email,password);
        ctx.updateNav();
        ctx.page.redirect('/dashboard');
    }
}
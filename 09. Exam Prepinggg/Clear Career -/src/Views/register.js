import {page,html,render} from '../api/lib.js';
import { register } from '../api/users.js';


const registerTemplate=(onSubmit)=>html
`
<section id="register">
        <form @submit=${onSubmit}>
          <div class="form">
            <h2>Register</h2>
            <form class="login-form">
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
              <button type="submit">register</button>
              <p class="message">Already registered? <a href="/login">Login</a></p>
            </form>
          </div>
          </form>
        </section>
`

export async function registerView(ctx){
    ctx.render(registerTemplate(onSubmit));


    async function onSubmit(event){
        event.preventDefault();
        const formData=new FormData(event.target);

        const email=formData.get('email');
        const password=formData.get('password');
        const rePassword=formData.get('re-password');

        console.log(rePassword);

        if(email==''||password==''){
            return alert('All fields must be filled!');
        }
        if(password!=rePassword){
            return alert('Passwords must be the same!');
        }

        await register(email,password);
        ctx.page.redirect('/dashboard');
    }
}
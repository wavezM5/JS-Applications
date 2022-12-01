import {page,html,render} from '../api/lib.js';
import { login } from '../api/users.js';


const loginTemplate=(onSubmit)=>html
`
<section id="login">
        <form @submit=${onSubmit}>
          <div class="form">
            <h2>Login</h2>
            <form class="login-form">
              <input type="text" name="email" id="email" placeholder="email" />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
              />
              <button type="submit">login</button>
              <p class="message">
                Not registered? <a href="/register">Create an account</a>
              </p>
            </form>
          </div>
        </form>
    </section>
`

export async function loginView(ctx){
    ctx.render(loginTemplate(onSubmit));


    async function onSubmit(event){
        event.preventDefault();
        const formData=new FormData(event.target);

        const email=formData.get('email');
        const password=formData.get('password');

        if(email==''||password==''){
            return alert('All fields must be filled!');
        }
        await login(email,password);
        ctx.page.redirect('/dashboard');
    }
}
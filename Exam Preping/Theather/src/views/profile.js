
import { getProfileById } from "../api/data.js";
import { html,render,page } from "../api/lib.js";
import { getUserData } from "../api/util.js";


const profileTemplate=(email,movie)=>html
`
<section id="profilePage">
            <div class="userInfo">
                <div class="avatar">
                    <img src="./images/profilePic.png">
                </div>
                <h2>${email}</h2>
            </div>
            <div class="board">
             
                ${movie.length==0
                ?html` <div class="no-events"> <p>This user has no events yet!</p></div>`
                :html`${movie.map(movieCard)}`}
               
            </div>
        </section>
`

const movieCard=(movie)=>html
`<div class="board">
                <div class="eventBoard">
                    <div class="event-info">
                        <img src="${movie.imageUrl}">
                        <h2>${movie.title}</h2>
                        <h6>${movie.date}</h6>
                        <a href="/details/${movie._id}" class="details-button">Details</a>
                    </div>
                </div>
`


export async function profileView(ctx){
    const userId=getUserData().id;
    const email=getUserData().email;
    console.log(getUserData());
    const movies=await getProfileById(userId);
    ctx.render(profileTemplate(email,movies));
}
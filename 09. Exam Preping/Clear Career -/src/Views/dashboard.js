import {page,html,render} from '../api/lib.js';
import {getAllJobOffers} from '../api/data.js';

const dashboardTemplate=(jobOffers)=>html
`
<section id="dashboard">
          <h2>Job Offers</h2>

          ${jobOffers.length>0?
            jobOffers.map(dashboardCard)
            :html `<h2>No offers yet.</h2>`}
        </section>
`

const dashboardCard=(jobOffers)=>html
`
<div class="offer">
<img src="${jobOffers.imageUrl}" alt="example1" />
<p>
  <strong>Title: </strong><span class="title">${jobOffers.title}</span>
</p>
<p><strong>Salary:</strong><span class="salary">${jobOffers.salary}</span></p>
<a class="details-btn" href="/details/${jobOffers._id}">Details</a>
</div>
`


export async function dashboardView(ctx){
    const jobOffers=await getAllJobOffers();
    console.log(jobOffers);
    ctx.render(dashboardTemplate(jobOffers));
}

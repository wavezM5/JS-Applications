import { getAllTheathers } from "../api/data.js";
import { html } from "../api/lib.js";

const homeTemplate = (data) => html`
  <!--Home Page-->
  <section class="welcomePage">
    <div id="welcomeMessage">
      <h1>My Theater</h1>
      <p>
        Since 1962 World Theatre Day has been celebrated by ITI Centres, ITI
        Cooperating Members, theatre professionals, theatre organizations,
        theatre universities and theatre lovers all over the world on the 27th
        of March. This day is a celebration for those who can see the value and
        importance of the art form “theatre”, and acts as a wake-up-call for
        governments, politicians and institutions which have not yet recognised
        its value to the people and to the individual and have not yet realised
        its potential for economic growth.
      </p>
    </div>
    <div id="events">
      <h1>Future Events</h1>
      <div class="theaters-container">
        ${data.length == 0
          ? html`<h4 class="no-event">No Events Yet...</h4>`
          : html`${data.map(homeCard)}`}
      </div>
    </div>
  </section>
`;

const homeCard = (card) => html`
  <!--Created Events-->
  <div class="eventsInfo">
    <div class="home-image">
      <img src="${card.imageUrl}" />
    </div>
    <div class="info">
      <h4 class="title">${card.title}</h4>
      <h6 class="date">${card.date}</h6>
      <h6 class="author">${card.author}</h6>
      <div class="info-buttons">
        <a class="btn-details" href="/details/${card._id}">Details</a>
      </div>
    </div>
  </div>
`;

export async function homeView(ctx) {
    const theathers = await getAllTheathers();
    ctx.render(homeTemplate(theathers));
}
function attachEvents() {

    let buttonLoad = document.querySelector("#btnLoadPosts");
    let buttonView = document.querySelector("#btnViewPost");
    let posts = document.querySelector("#posts");
    let postTitle = document.querySelector("#post-title");
    let postBody = document.querySelector("#post-body");
    let postComments = document.querySelector("#post-comments");
    
    const urlPosts = `http://localhost:3030/jsonstore/blog/posts`;

    buttonLoad.addEventListener("click", async () => {
        posts.replaceChildren();
        const response = await fetch(urlPosts);
        const data = await response.json();

        for (const value of Object.values(data)) {
            let option = document.createElement("option");
            option.value = value.id;
            option.textContent = value.title;

            posts.appendChild(option); 
        }
    });

    buttonView.addEventListener('click', async () => {

        postComments.replaceChildren(); // Clear
    
        let targetId = posts.value;
        const response = await fetch(`http://localhost:3030/jsonstore/blog/posts/${targetId}`);
        const currentPostChosen = await response.json();

        postTitle.textContent = currentPostChosen.title;
        postBody.textContent = currentPostChosen.body;

        let responseOfComments = await fetch(`http://localhost:3030/jsonstore/blog/comments`);
        let comments = await responseOfComments.json();
        
        for (const value of Object.values(comments)) {
            if(currentPostChosen.id == value.postId) {
                let li = document.createElement("li");
                li.textContent = value.text;

                postComments.appendChild(li);
            }
        }

    });

}

attachEvents();
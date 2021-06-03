window.addEventListener("DOMContentLoaded", (event)=>{
    const fetchStories = async () => {
        const res = await fetch('/api/stories'
        // , {
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem(
        //       "STORY_LITE_ACCESS_TOKEN"
        //     )}`,
        //   },
        // }
        );
        if (res.status === 401) {
          window.location.href = "/log-in";
          return;
        }

        const { stories } = await res.json();

        const storiesContainer = document.querySelector(".story");
        const storiesHtml = stories.map(
          ({ content, image, User: { username } }) =>
          `
          <div class="container">
                <div class="story">
                    <div class="user-column">
                        <div class="user-picture">
                            <img id="user-picture" src="p1.jpeg">
                        </div>
                        <div class="user-name">
                            ${username}
                        </div>
                        <div class="follow-state">
                            Follow
                        </div>
                        <div class="likes-counter>
                            123
                        </div>
                        <div class="like-icon">
                            <i class="fas fa-heart"></i>
                        </div>
                        <div class="comment-icon">
                            <i class="far fa-comment"></i>
                        </div>
                    </div>
                    <div class="story-board">
                        <div class="story-picture>
                            <img id="story-picture" src=${image}>
                        </div>
                        <div class="content">
                            <div class="story-title>
                                STORIES:
                            </div>
                            <div class="story-content">
                                ${content}
                            </div>
                            <div class="comments">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
          `
        );
        console.log(storiesHtml);
        storiesContainer.innerHTML = storiesHtml.join(" ");
      };

      fetchStories();
})

// import { handleErrors } from "./utils.js";


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
    window.location.href = "/stories";
    // const { stories } = await res.json();
    // const storiesContainer = document.querySelector(".story");
    // const storiesHtml = stories.map(
    //   ({ content, image, user: { username } }) =>
    //   `
    //     <div class="story">
    //         <div class="user-column">
    //             <div class="user-picture">
    //                 <img id="user-picture" src="p1.jpeg">
    //             </div>
    //             <div class="user-name">
    //                 ${username}
    //             </div>
    //             <div class="follow-state">
    //                 Follow
    //             </div>
    //             <div class="likes-counter>
    //                 123
    //             </div>
    //             <div class="like-icon">
    //                 <i class="fas fa-heart"></i>
    //             </div>
    //             <div class="comment-icon">
    //                 <i class="far fa-comment"></i>
    //             </div>
    //         </div>
    //         <div class="story-board">
    //             <div class="story-picture>
    //                 <img id="story-picture" src=${image}>
    //             </div>
    //             <div class="content">
    //                 <div class="story-title>
    //                     STORIES:
    //                 </div>
    //                 <div class="story-content">
    //                     ${content}
    //                 </div>
    //                 <div class="comments">
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    //   `
    // );
    // storiesContainer.innerHTML = storiesHtml.join("");
  };


// document.addEventListener("DOMContentLoaded", async () => {
//     try {
//       await fetchStories();
//     } catch (e) {
//       console.error(e);
//     }
// });



const form = document.querySelector(".create-form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const image = formData.get("image");
    const location = formData.get("location");
    const content = formData.get("content");
    const body = { image, location, content };
    try {
      const res = await fetch('/api/stories', {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json"
        //   Authorization: `Bearer ${localStorage.getItem(
        //     "STORY_LITE_ACCESS_TOKEN"
        //   )}`,
        },
      });
      if (res.status === 401) {
        window.location.href = "/log-in";
        return;
      }
      if (!res.ok) {
        throw res;
      }
      form.reset();
      await fetchStories();
    } catch (err) {
    //   handleErrors(err);
    }
  });

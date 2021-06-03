window.addEventListener("DOMContentLoaded", (event)=>{
    // console.log("hello from javascript!")



    // document.addEventListener("DOMContentLoaded", async () => {
    //     try {
    //       await fetchStories();
    //     } catch (e) {
    //       console.error(e);
    //     }
    // });



    const form = document.querySelector(".comment-form");

    form.addEventListener("submit", async (e) => {
        const formData = new FormData(form);
        const image = formData.get("content");
        const body = { content };
        try {
          const res = await fetch('/api/comments', {
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
        //   form.reset();
        //   await fetchComments();
          window.location.href = "/stories";
        } catch (err) {
        //   handleErrors(err);
        }
      });


    const commentButton = document.querySelector(".far.fa-comment")

    

    commentButton.addEventListener("click", (e)=>{
          console.log("commentButton is here");
          window.location.href = "/api/comments";
    })

})

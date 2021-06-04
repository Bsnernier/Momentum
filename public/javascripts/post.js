// import { handleErrors } from "./utils.js";
window.addEventListener("DOMContentLoaded", (event) => {
  // console.log("hello from javascript!")



  // document.addEventListener("DOMContentLoaded", async () => {
  //     try {
  //       await fetchStories();
  //     } catch (e) {
  //       console.error(e);
  //     }
  // });



  const form = document.querySelector(".create-form");
  if (form) {
    form.addEventListener("submit", async (e) => {

      try {
        const formData = new FormData(form);
        const image = formData.get("image");
        const location = formData.get("location");
        const content = formData.get("content");
        const category = formData.get("category");
        const body = { image, location, content, category };
        const res = await fetch('/api/stories', {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
            //   Authorization: `Bearer ${localStorage.getItem(
            //     "STORY_LITE_ACCESS_TOKEN"
            //   )}`,
          }
        });

        if (res.status === 401) {
          window.location.href = "/log-in";
          return;
        }
        if (!res.ok) {
          throw res;
        }
        //   form.reset();
        //   await fetchStories();
        window.location.href = "/stories";
      } catch (err) {
        console.log(err)
      }
    });
  }

})

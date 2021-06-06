
window.addEventListener("DOMContentLoaded", (event) => {

  const form = document.querySelector(".create-form");


  if (form) {
    form.addEventListener("submit", async (e) => {

      try {
        const formData = new FormData(form);
        const image = formData.get("image");
        const location = formData.get("location");
        const content = formData.get("content");
        const categoryEle = document.querySelector("#category");

        const category = categoryEle.value;

        const body = { image, location, content, category };
        const res = await fetch('/api/stories', {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json"
          }
        });

        if (res.status === 401) {
          window.location.href = "/log-in";
          return;
        }
        if (!res.ok) {
          throw res;
        }
        window.location.href = "/stories";
      } catch (err) {
        console.log(err)
        throw err
      }
    });
  }

})

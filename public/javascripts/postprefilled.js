
window.addEventListener("DOMContentLoaded", (event) => {

    const form = document.querySelector(".create-form");


    if (form) {
        form.addEventListener("submit", async (e) => {
            event.preventDefault();
            try {
                const formData = new FormData(form);
                const image = formData.get("image");
                const location = formData.get("location");
                const content = formData.get("content");
                const categoryEle = document.querySelector("#category");
                const id = e.target.id

                const category = categoryEle.value;

                const body = { image, location, content, category};
                const res = await fetch(`/api/stories/${id}`, {
                    method: "PUT",
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


                // const { image1, location1, content1, username1 } = res.json()
                // const userNameEle = document.querySelector(".user-name");
                // userNameEle.innerHTML = username1;
                // const imgEle = document.querySelector("#story-picture");
                // imgEle.innerHTML = image1;
                // const contentElement = document.querySelector(".story-content");
                // contentElement.innerHTML = content1;



                window.location.href = `/stories/mystories`;
            } catch (err) {
                throw err
            }
        });
    }

})

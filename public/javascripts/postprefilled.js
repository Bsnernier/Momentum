
window.addEventListener("DOMContentLoaded", (event) => {
    console.log("I'm here!!!!!");
    const form = document.querySelector(".create-form");
    const storyEditLink = document.querySelector(".story-title")

    // console.log("_____", storyEditLink);
    // if (form) {
    storyEditLink.addEventListener("submit", async (e) => {
        console.log("I'm listing!!!!");
        // try {
        // const formData = new FormData(form);
        // const image1 = formData.get("image");
        // const location1 = formData.get("location");
        // const content1 = formData.get("content");
        // const image1 = document.querySelector("#story-picture").innerHTML;
        // const content1 = document.querySelector(".story-content");

        // const body = { image:image1, content:content1, location:location1};
        const res = await fetch("api/stories/:id", {
            method: 'PUT'
            // headers: {
            //     'Content-Type': 'application/json'
            // },
            // body: JSON.stringify(body)
        })

        if (res.status === 401) {
            window.location.href = "/log-in";
            return;
        }
        if (!res.ok) {
            throw res;
        }
        // const {image, location, content, username} = res.json()
        // const imageEle = document.querySelector('#pictureUrl');
        // imageEle.value = image;
        // const locationEle = document.querySelector("#placeName");
        // locationEle.value =  location;
        // const contentEle = document.querySelector("#stories")
        // contentEle.value = content;

        // const userNameEle = document.querySelector(".user-name");
        // userNameEle.innerHTML = username;
        // const imgEle = document.querySelector("#story-picture");
        // imgEle.innerHTML = image;
        // const contentElement = document.querySelector(".story-content");
        // contentElement.innerHTML = content;

        // window.location.href = "/stories";
        res.send(200);
        //     }
        //     catch (err) {
        //         console.log(err)
        //         throw err
        //     }
        //     });
    }

)})

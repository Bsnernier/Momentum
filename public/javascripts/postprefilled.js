
// window.addEventListener("DOMContentLoaded", (event) => {
//     console.log("I'm here!!!!!");
//     const form = document.querySelector(".create-form-prefilled");
//     // const storyEditLink = document.querySelector(".story-title")

//     // console.log("_____", storyEditLink);
//     // if (form) {
//     form.addEventListener("submit", async (e) => {
//         console.log("I'm listing!!!!");
//         try {
//             const formData = new FormData(form);
//         const image = formData.get("image");
//         const location = formData.get("location");
//         const content = formData.get("content");
//         const categoryEle = document.querySelector("#category");

//         const category = categoryEle.value;

//         // const body = { image, location, content, category };
//         //     const body = { image: image1, content: content1, location: location1 };
//         //     await fetch("api/stories/:id", {
//         //         method: 'PUT',
//         //         headers: {
//         //             'Content-Type': 'application/json'
//         //         },
//         //         body: JSON.stringify(body)
//         //     })
//             const res = await fetch('/api/stories', {
//                 method: "POST",
//                 body: JSON.stringify(body),
//                 headers: {
//                   "Content-Type": "application/json"
//                 }
//               });

//             if (res.status === 401) {
//                 window.location.href = "/log-in";
//                 return;
//             }
//             if (!res.ok) {
//                 throw res;
//             }
//             // const { image, location, content, username } = res.json()
//             // const imageEle = document.querySelector('#pictureUrl');
//             // imageEle.value = image;
//             // const locationEle = document.querySelector("#placeName");
//             // locationEle.value =  location;
//             // const contentEle = document.querySelector("#stories")
//             // contentEle.value = content;

//             // const userNameEle = document.querySelector(".user-name");
//             // userNameEle.innerHTML = username;
//             // const imgEle = document.querySelector("#story-picture");
//             // imgEle.innerHTML = image;
//             // const contentElement = document.querySelector(".story-content");
//             // contentElement.innerHTML = content;

//             window.location.href = "/stories";
//             res.send(200);
//         }
//         catch (err) {
//             console.log(err)
//             throw err
//         }
//     });
// })

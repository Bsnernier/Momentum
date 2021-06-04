document.addEventListener("DOMContentLoaded", async (event) => {
    console.log("REEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
    const likeButton = document.querySelector(".like-icon")

    const myHeaders = new Headers();

    const myRequest = new Request('/api/likes', {
        method: 'POST',
        headers: myHeaders,
    })

    likeButton.addEventListener("click", async (e) => {
        const upLike = await fetch(myRequest)
        const thenThis = await upLike.json()
        console.log(thenThis)
        console.log("BOOTAH")
        // fetch("/api/likes")
        //     .then(response => response.json())
        //     .then(data => console.log(data))

    })
})

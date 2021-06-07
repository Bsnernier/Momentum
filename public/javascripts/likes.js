document.addEventListener("DOMContentLoaded", async (event) => {

    const likeCounters = document.querySelectorAll(".likes-counter")
    const likeButtons = document.querySelectorAll(".fa-heart")

    const addLike = async function (id) {
        const res1 = await fetch (`/api/stories/${id}/likes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const res2 = await fetch (`/api/stories/${id}/likes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const json = await res2.json()
        const count = json.currentLike.length
        return count
    }

    const removeLike = async function (id) {
        const res1 = await fetch (`/api/stories/${id}/likes`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const res2 = await fetch (`/api/stories/${id}/likes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const json = await res2.json()
        const count = json.currentLike.length
        return count
    }


    likeButtons.forEach((button) => {
        button.addEventListener("click", async (e) => {
            if (button.classList.contains("far")) {
                const count = await addLike(e.target.id)
                const counter = document.querySelector(`.counter-${e.target.id}`)
                counter.innerHTML= count
                button.classList.remove("far")
                button.classList.add("fas")
            } else if (button.classList.contains("fas")) {
                const count = await removeLike(e.target.id)
                const counter = document.querySelector(`.counter-${e.target.id}`)
                counter.innerHTML= count
                button.classList.remove("fas")
                button.classList.add("far")
            }
        }
    )})


})

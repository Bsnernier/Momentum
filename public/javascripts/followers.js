window.addEventListener('DOMContentLoaded', event => {

    const followButtons = document.querySelectorAll('.follow-button')
    const unfollowButtons = document.querySelectorAll('.unfollow-button')
    const blockButtons = document.querySelectorAll('.block-button')

    followButtons.forEach(button => {
        button.addEventListener("click", async (event) => {
            const id = event.target.id
            const res = await fetch(`/api/users/${id}`, {
                method: "post",
                headers: {"content-type": "application/json"},
            })
            window.location.href = '/users/followers'
        })
    })

    unfollowButtons.forEach(button => {
        button.addEventListener("click", async (event) => {
            const id = event.target.id
            const res = await fetch(`/api/users/${id}`, {
                method: 'delete',
                headers: {"content-type": "application/json"},
            })
            window.location.href = '/users/followers'
        })
    })

    blockButtons.forEach(button => {
        button.addEventListener("click", async (event) => {
            const id = event.target.id
            const res = await fetch(`/api/users/${id}/block`, {
                method: 'delete',
                headers: {"content-type": "application/json"},
            })
            window.location.href = '/users/followers'
        })
    })

})

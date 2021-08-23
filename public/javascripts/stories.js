window.addEventListener("DOMContentLoaded", (event)=>{

    const editStoriesButtons = document.querySelectorAll(".fa-pen")

    if(editStoriesButtons){
      editStoriesButtons.forEach(editStoriesButton =>{
        editStoriesButton.addEventListener("click", (e)=>{
          const storyId = e.target.id;
          window.location.href = `/post/new/${storyId}`;
        })
      })
    }
})

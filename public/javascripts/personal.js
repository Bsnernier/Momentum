window.addEventListener("DOMContentLoaded", (event)=>{

    const deleteIcons = document.querySelectorAll(".fa-trash-alt")

    if(deleteIcons){
      deleteIcons.forEach(deleteIcon => {
       deleteIcon.addEventListener("click", async (e)=>{
        const id = e.target.id;
        const res = await fetch(`/api/stories/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        })

        if(res.status == 200){
            const story = document.querySelector(`.story${id}`);
            story.innerHTML="";
        }

       })
      })
    }

})

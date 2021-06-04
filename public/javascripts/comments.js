window.addEventListener("DOMContentLoaded", (event)=>{
    // console.log("hello from javascript!")
    // document.addEventListener("DOMContentLoaded", async () => {
    //     try {
    //       await fetchStories();
    //     } catch (e) {
    //       console.error(e);
    //     }
    // });

    const commentButtons = document.querySelectorAll(".fa-comment")

    if(commentButtons){
      commentButtons.forEach(commentButton =>{
        commentButton.addEventListener("click", (e)=>{
          const id = e.target.id;
          window.location.href = `/comments/${id}`;
        })
      })
    }

    const deleteButtons = document.querySelectorAll(".fa-backspace")

    if(deleteButtons){
      deleteButtons.forEach(deleteButton => {
       deleteButton.addEventListener("click", async (e)=>{
        const id = e.target.id;

        const res = await fetch(`/api/comments/${id}`, {
          method: "DElETE",
          headers: {
            "Content-Type": "application/json"
          }
        }).catch((error) => {
          console.error(error);
        });


        if(res.status == 200){
          document.getElementById(`${id}`).innerHTML="";
        }
        

       })
      })
    }

    const form = document.querySelector(".comment-form");

    if(form){
      form.addEventListener("submit", async (event) => {
        const formData = new FormData(form);
        const content = formData.get("content");
        const body = { content };
        try {
          const id = event.target.id
          const res = await fetch(`/api/comments/${id}`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json"
            },
          });
          if (res.status === 401) {
            window.location.href = "/log-in";
            return;
          }
          if (!res.ok) {
            throw res;
          }
        //   form.reset();
        //   await fetchComments();
          window.location.href = "/stories";

        } catch (err) {
        //   handleErrors(err);
        }
      });
    }

})

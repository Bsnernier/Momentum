window.addEventListener("DOMContentLoaded", (event)=>{



  const commentButtons = document.querySelectorAll(".fa-comment")

  if(commentButtons){
    commentButtons.forEach(commentButton =>{
      commentButton.addEventListener("click", (e)=>{
        const id = e.target.id;
        window.location.href = `/comments/category/${id}`;
      })
    })
  }

  const deleteButtons = document.querySelectorAll(".fa-backspace")

  if(deleteButtons){
    deleteButtons.forEach(deleteButton => {
     deleteButton.addEventListener("click", async (e)=>{
      const id = e.target.id;

      const res = await fetch(`/api/comments/${id}`, {
        method: "DELETE",
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
      event.preventDefault();
      const formData = new FormData(form);
      const content = formData.get("content");

      const body = { content };
      // try {
        const id = event.target.id
        console.log("my id: ", id)

        const res = await fetch(`/api/comments/category/${id}`, {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json"
          },
        });
        console.log("after res", res.status)

        if (res.status === 401) {
          window.location.href = "/log-in";
          return;
        }
        // if (!res.ok) {
        //   throw res;
        // }
        console.log("before category json")
        const { category } = await res.json();
        console.log("category is", category)
        window.location.href = "/stories";
        window.location.href = `/stories/${category}`;
        console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")

      // } catch (err) {
        // window.location.href = "/stories";
      // }
    });
  }

})

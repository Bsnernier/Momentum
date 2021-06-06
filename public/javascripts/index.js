window.addEventListener("DOMContentLoaded", (event)=>{
    const fetchStories = async () => {
        const res = await fetch('/api/stories');
        if (res.status === 401) {
          window.location.href = "/log-in";
          return;
        }
      };

      fetchStories();
})

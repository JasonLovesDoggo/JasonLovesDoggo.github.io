setTimeout(function() {
        document.getElementById("loading").classList.add("animated");
        document.getElementById("loading").classList.add("fadeOut");
        setTimeout(function() {
          document.getElementById("loading").classList.remove("animated");
          document.getElementById("loading").classList.remove("fadeOut");
          document.getElementById("loading").style.display = "none";
        }, 800);
      }, 1500);
      $.getJSON("blog.json", function(blog) {
        blog = blog || [];
        if (blog.length == 0) {
          return (document.getElementById("blog_section").style.display =
            "none");
        }
        for (var i = 0; i < blog.length; i++) {
          $("#blogs").append(`
            <a href="./blog/${blog[i].url_title}/" target="_blank">
                <section>
                    <img src="./blog/${blog[i].url_title}/${blog[i].top_image}">
                    <div class="blog_container">
                        <div class="section_title">${blog[i].title}</div>
                        <div class="about_section">
                            ${blog[i].sub_title}
                        </div>
                    </div>
                </section>
            </a>
            `);
        }
      }).fail(function() {
        return (document.getElementById("blog_section").style.display = "none");
      });
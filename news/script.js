document.addEventListener("DOMContentLoaded", function() {
    
    // --- Breaking News Ticker ---
    const tickerText = document.getElementById("breaking-news-ticker");
    if (tickerText) {
        const newsItems = [
            "This is the first breaking news item!",
            "Here is another important update.",
            "KDEC Times is now live!",
            "Technology breakthrough announced today."
        ];
        
        let currentItem = 0;
        
        function changeNews() {
            tickerText.style.opacity = 0; // Fade out
            setTimeout(() => {
                currentItem = (currentItem + 1) % newsItems.length;
                tickerText.textContent = newsItems[currentItem];
                tickerText.style.opacity = 1; // Fade in
            }, 500); // Wait for fade out
        }
        
        // Change news every 5 seconds
        setInterval(changeNews, 5000);
    }

    // --- NEW: Dark Mode Toggle ---
    const toggleButton = document.getElementById("dark-mode-toggle");
    const body = document.body;

    // Function to apply the saved theme
    function applyTheme(theme) {
        if (theme === "dark") {
            body.classList.add("dark-mode");
        } else {
            body.classList.remove("dark-mode");
        }
    }

    // Check for saved theme in localStorage
    let savedTheme = localStorage.getItem("theme");
    if (!savedTheme) {
        // If no theme saved, check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            savedTheme = "dark";
        } else {
            savedTheme = "light";
        }
    }
    applyTheme(savedTheme);

    // Add click event listener for the toggle
    toggleButton.addEventListener("click", () => {
        let newTheme;
        if (body.classList.contains("dark-mode")) {
            newTheme = "light";
        } else {
            newTheme = "dark";
        }
        applyTheme(newTheme);
        localStorage.setItem("theme", newTheme); // Save the new theme
    });


    // --- NEW: Back to Top Button ---
    const backToTopButton = document.getElementById("back-to-top");

    // Show or hide the button based on scroll position
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) { // Show after scrolling 300px
            backToTopButton.classList.add("show");
        } else {
            backToTopButton.classList.remove("show");
        }
    });

    // Scroll to top when clicked
    backToTopButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

});

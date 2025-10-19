document.addEventListener("DOMContentLoaded", function() {
    
    // --- Live Date/Time ---
    const dateElement = document.getElementById("current-date");
    if (dateElement) {
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        dateElement.textContent = new Date().toLocaleDateString('en-US', options);
    }
    
    // --- Breaking News Ticker ---
    const tickerText = document.getElementById("breaking-news-ticker");
    if (tickerText) {
        const newsItems = [
            "Global leaders convene for climate summit amid growing concerns.",
            "New AI breakthroughs promise revolutionary changes in healthcare.",
            "Local economy shows signs of strong recovery after recent downturn.",
            "Sports team KDEC United secures dramatic victory in championship final.",
            "Market volatility expected as central banks announce policy shifts."
        ];
        
        let currentItem = 0;
        
        function changeNews() {
            tickerText.style.opacity = 0;
            setTimeout(() => {
                currentItem = (currentItem + 1) % newsItems.length;
                tickerText.textContent = newsItems[currentItem];
                tickerText.style.opacity = 1;
            }, 500);
        }
        setInterval(changeNews, 5000);
    }

    // --- Dark Mode Toggle ---
    const toggleButton = document.getElementById("dark-mode-toggle");
    const body = document.body;

    function applyTheme(theme) {
        if (theme === "dark") {
            body.classList.add("dark-mode");
            // Logo filter logic is REMOVED
        } else {
            body.classList.remove("dark-mode");
            // Logo filter logic is REMOVED
        }
    }

    let savedTheme = localStorage.getItem("theme");
    if (!savedTheme) {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            savedTheme = "dark";
        } else {
            savedTheme = "light";
        }
    }
    applyTheme(savedTheme);

    toggleButton.addEventListener("click", () => {
        let newTheme;
        if (body.classList.contains("dark-mode")) {
            newTheme = "light";
        } else {
            newTheme = "dark";
        }
        applyTheme(newTheme);
        localStorage.setItem("theme", newTheme); 
    });


    // --- Back to Top Button ---
    const backToTopButton = document.getElementById("back-to-top");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) { 
            backToTopButton.classList.add("show");
        } else {
            backToTopButton.classList.remove("show");
        }
    });

    backToTopButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // --- Dynamic Article Content (Images, Headlines, Summaries, Dates) ---
    // This code will only run on index.html because all-feeds.html doesn't have these elements

    const newsData = {
        technology: {
            headlines: [
                "The Rise of Quantum Computing: What It Means for Our Future",
                "AI Ethics in Focus: Regulators Eye New Guidelines",
                "Breakthrough in Renewable Energy Storage Announced",
                "Cybersecurity Threats Evolve: New Defenses Needed",
                "Space Exploration Heats Up with Private Sector Innovation"
            ],
            summaries: [
                "Experts debate the societal impact as quantum technology moves from labs to industry, promising unprecedented processing power.",
                "Governments worldwide are considering frameworks to ensure AI development aligns with ethical standards and human values.",
                "A new battery technology promises to store renewable energy more efficiently, paving the way for wider adoption.",
                "As digital threats become more sophisticated, cybersecurity firms race to develop innovative solutions to protect data.",
                "Billionaire-backed ventures are pushing the boundaries of space travel, aiming for Mars and beyond."
            ]
        },
        world: {
            headlines: [
                "Global Diplomacy Efforts Intensify Amid Regional Conflicts",
                "Economic Forecasts Mixed as Inflation Concerns Persist",
                "Major Humanitarian Crisis Unfolds in East Africa",
                "International Alliance Formed to Combat Cybercrime",
                "Historic Peace Talks Conclude with Cautious Optimism"
            ],
            summaries: [
                "Leaders from several nations are engaging in high-stakes talks to de-escalate tensions and find diplomatic solutions to ongoing conflicts.",
                "Analysts present varied outlooks on the global economy, with rising energy prices and supply chain issues impacting growth.",
                "Millions are in urgent need of aid as drought and political instability exacerbate food shortages across several countries.",
                "A new coalition of nations has vowed to share intelligence and resources to tackle the growing threat of international cyberattacks.",
                "After months of negotiations, rival factions have signed a preliminary agreement, offering a glimmer of hope for lasting peace."
            ]
        },
        local: {
            headlines: [
                "City Council Approves New Downtown Revitalization Project",
                "Community Volunteers Rally for Annual Park Cleanup Event",
                "Traffic Congestion Solutions Proposed for Rush Hour Hotspots",
                "Local Schools Report Record Enrollment Numbers This Year",
                "Farmers Market Sees Bumper Crop, Supports Local Economy"
            ],
            summaries: [
                "The long-awaited project aims to bring new businesses and cultural spaces to the city center, boosting local commerce and tourism.",
                "Hundreds of residents participated in making local green spaces cleaner and more enjoyable for everyone.",
                "New strategies, including smart traffic lights and public transport incentives, are being considered to ease daily commutes.",
                "An influx of new families has led to a significant increase in student numbers across the district's primary and secondary schools.",
                "The recent harvest has provided an abundance of fresh produce, benefiting both local farmers and consumers."
            ]
        },
        business: {
            headlines: [
                "Tech Giant's Quarterly Earnings Exceed Expectations",
                "Startup Secures Major Funding for Sustainable Solutions",
                "Retail Sector Adapts to Changing Consumer Habits",
                "New Trade Agreement Promises Boost for Local Exports",
                "Real Estate Market Shows Resilience Amid Economic Shifts"
            ],
            summaries: [
                "Strong performance in cloud services and AI initiatives drove the company's impressive financial results, sending stock prices soaring.",
                "An innovative company focused on eco-friendly packaging has closed a multi-million dollar investment round, fueling expansion plans.",
                "Online shopping and personalized experiences are key trends driving changes in how traditional retailers operate and engage customers.",
                "The recently ratified deal with neighboring countries is expected to open new markets and significantly increase exports for domestic businesses.",
                "Despite fluctuating interest rates, the local housing market remains robust, with steady demand and stable property values."
            ]
        },
        sports: {
            headlines: [
                "KDEC United Clinches Championship in Thrilling Overtime Finish",
                "Star Athlete Announces Retirement After Illustrious Career",
                "New Training Facility Unveiled for Youth Sports Programs",
                "Local Marathon Sets New Participation Record",
                "Basketball Team Prepares for Crucial Playoff Series"
            ],
            summaries: [
                "The local football club secured a hard-fought victory against their rivals, sparking celebrations across the city.",
                "A legendary figure in the world of athletics has decided to hang up their boots, leaving behind a legacy of records and triumphs.",
                "State-of-the-art amenities will now be available to young aspiring athletes, fostering talent and promoting healthy lifestyles.",
                "Thousands of runners took to the streets, making this year's annual marathon the biggest yet, raising funds for charity.",
                "Intensive practices are underway as the KDEC basketball squad gears up for their most important games of the season."
            ]
        }
    };

    function getRandomItem(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function getRandomDate() {
        const today = new Date();
        const pastDate = new Date(today.setDate(today.getDate() - Math.floor(Math.random() * 30))); // Within last 30 days
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        return pastDate.toLocaleDateString('en-US', options);
    }

    function getRandomImage(keywords, width, height) {
        const cacheBuster = Math.floor(Math.random() * 10000); 
        const keywordString = keywords.replace(/,/g, '+'); 
        return `https://source.unsplash.com/${width}x${height}/?${keywordString}&sig=${cacheBuster}`;
    }

    const featuredArticle = document.querySelector('.featured-article');
    if (featuredArticle) {
        const imgElement = featuredArticle.querySelector('img');
        const h2Element = featuredArticle.querySelector('h2 a');
        const pElement = featuredArticle.querySelector('p');
        const dateSpan = featuredArticle.querySelector('.article-meta .article-date');

        const category = h2Element.dataset.category || 'world'; 
        const keywords = imgElement.dataset.keywords || 'news';

        if (imgElement) {
            imgElement.src = getRandomImage(keywords, 800, 400);
        }
        if (h2Element && newsData[category]) {
            h2Element.textContent = getRandomItem(newsData[category].headlines);
        }
        if (pElement && newsData[category]) {
            pElement.textContent = getRandomItem(newsData[category].summaries);
        }
        if (dateSpan) {
            dateSpan.textContent = getRandomDate();
        }
    }

    const articleCards = document.querySelectorAll('.article-card');
    articleCards.forEach(card => {
        const imgElement = card.querySelector('img');
        const h3Element = card.querySelector('h3 a');
        const pElement = card.querySelector('p');
        const dateSpan = card.querySelector('.article-meta .article-date');

        const category = h3Element.dataset.category || 'world'; 
        const keywords = imgElement.dataset.keywords || 'news';

        if (imgElement) {
            imgElement.src = getRandomImage(keywords, 400, 200);
        }
        if (h3Element && newsData[category]) {
            h3Element.textContent = getRandomItem(newsData[category].headlines);
        }
        if (pElement && newsData[category]) {
            pElement.textContent = getRandomItem(newsData[category].summaries);
        }
        if (dateSpan) {
            dateSpan.textContent = getRandomDate();
        }
    });

});

document.addEventListener('DOMContentLoaded', () => {

    // --- Get Text Input Elements ---
    const nameInput = document.getElementById('nameInput');
    const ageInput = document.getElementById('ageInput');
    const messageInput = document.getElementById('messageInput');
    const generateBtn = document.getElementById('generateBtn');

    // --- Get Card Text Output Elements ---
    const cardRecipient = document.getElementById('cardRecipient');
    const cardAgeDisplay = document.getElementById('cardAgeDisplay');
    const cardMessageBody = document.getElementById('cardMessageBody');

    // --- Get Photo and Download Elements ---
    const photoInput = document.getElementById('photoInput');
    const cardImage = document.getElementById('cardImage');
    const downloadBtn = document.getElementById('downloadBtn');
    const birthdayCard = document.getElementById('birthdayCard');
    
    // --- NEW: Get File Name Span ---
    const fileNameSpan = document.getElementById('fileName');
    
    
    // --- Helper function to trigger the card animation ---
    function triggerCardAnimation() {
        birthdayCard.classList.remove('card-updated');
        void birthdayCard.offsetWidth; 
        birthdayCard.classList.add('card-updated');
    }

    
    // --- Event Listener for Text ---
    generateBtn.addEventListener('click', () => {
        const name = nameInput.value || "...";
        const age = ageInput.value || "...";
        const message = messageInput.value || "Your message will appear here.";

        cardRecipient.textContent = `To: ${name}`;
        cardAgeDisplay.textContent = `Congratulations on turning ${age}!`;
        cardMessageBody.textContent = `"${message}"`;

        triggerCardAnimation();
    });

    
    // --- Event Listener for Photo Upload ---
    photoInput.addEventListener('change', (event) => {
        // NEW: Update the file name display
        if (event.target.files.length > 0) {
            fileNameSpan.textContent = event.target.files[0].name;
        } else {
            fileNameSpan.textContent = 'No file chosen';
        }

        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                cardImage.src = e.target.result;
                cardImage.style.display = 'block'; 
                
                triggerCardAnimation();
            };

            reader.readAsDataURL(file);
        }
    });

    
    // --- Event Listener for Download Button ---
    downloadBtn.addEventListener('click', () => {
        html2canvas(birthdayCard, {
            useCORS: true, 
            scale: 2 
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = 'my-birthday-card.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    });

    // --- Butterfly Animation (Keep all from previous step) ---

    const butterflyContainer = document.querySelector('.butterfly-container');
    const numButterflies = 20; 
    const butterflies = []; 

    for (let i = 0; i < numButterflies; i++) {
        // 1. Create the HTML elements
        const butterflyEl = document.createElement('div');
        butterflyEl.classList.add('butterfly');
        
        const type = Math.floor(Math.random() * 3) + 1;
        butterflyEl.classList.add(`type-${type}`);

        butterflyEl.innerHTML = `
            <div class="wing left"></div>
            <div class="body"></div>
            <div class="wing right"></div>
        `;
        
        butterflyContainer.appendChild(butterflyEl);

        // 2. Apply random colors
        const wings = butterflyEl.querySelectorAll('.wing');
        const body = butterflyEl.querySelector('.body');
        
        const hue1 = Math.random() * 360;
        const hue2 = (hue1 + Math.random() * 60 - 30) % 360; 
        
        const color1 = `hsl(${hue1}, 90%, 65%)`;
        const color2 = `hsl(${hue2}, 90%, 60%)`;
        
        wings.forEach(wing => {
            wing.style.background = `linear-gradient(45deg, ${color1}, ${color2})`;
        });
        
        const bodyColor = `hsl(${Math.random() * 60}, 10%, ${Math.random() * 20 + 20}%)`; 
        body.style.background = bodyColor;

        // 3. Store data for animation
        butterflies.push({
            el: butterflyEl,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            speedX: Math.random() * 2 + 1, 
            speedY: Math.random() * 1 + 0.5, 
            waveAngle: Math.random() * Math.PI * 2,
            waveFreq: Math.random() * 0.05 + 0.02, 
            waveAmp: Math.random() * 50 + 20, 
            scale: Math.random() * 0.5 + 0.75 
        });
    }

    let startTime = 0;
    
    // 4. The animation loop
    function animateButterflies(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;

        butterflies.forEach(b => {
            b.x += b.speedX;
            b.waveAngle += b.waveFreq;
            b.y -= b.speedY; 
            
            const flutter = Math.sin(b.waveAngle) * b.waveAmp;

            b.el.style.transform = `
                translateX(${b.x + flutter}px) 
                translateY(${b.y}px) 
                scale(${b.scale})
            `;
            
            if (b.x > window.innerWidth + 100 || b.y < -100) {
                b.x = -100; 
                b.y = Math.random() * window.innerHeight; 
            }
        });

        requestAnimationFrame(animateButterflies);
    }

    requestAnimationFrame(animateButterflies);

});

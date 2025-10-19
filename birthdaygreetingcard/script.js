document.addEventListener('DOMContentLoaded', () => {

    // --- Get Input Elements ---
    const nameInput = document.getElementById('nameInput');
    const ageInput = document.getElementById('ageInput');
    const messageInput = document.getElementById('messageInput');
    const photoInput = document.getElementById('photoInput');
    const fileNameSpan = document.getElementById('fileName');
    const generateBtn = document.getElementById('generateBtn');
    const downloadBtn = document.getElementById('downloadBtn');

    // --- Get Card Display Elements ---
    const birthdayCard = document.getElementById('birthdayCard');
    const cardImage = document.getElementById('cardImage');
    const cardTitle = document.getElementById('cardTitle');
    const cardRecipient = document.getElementById('cardRecipient');
    const cardAgeDisplay = document.getElementById('cardAgeDisplay');
    const cardMessageBody = document.getElementById('cardMessageBody');
    const cardDecoration = document.getElementById('decoration');

    // --- Get Template Selector Elements ---
    const templateCards = document.querySelectorAll('.template-card');


    // --- Helper function to trigger the card animation ---
    function triggerCardAnimation() {
        birthdayCard.classList.remove('card-updated');
        void birthdayCard.offsetWidth; // Trigger reflow
        birthdayCard.classList.add('card-updated');
    }

    // --- Function to update card content ---
    function updateCardContent() {
        const name = nameInput.value.trim();
        const age = ageInput.value.trim();
        const message = messageInput.value.trim();

        cardRecipient.textContent = name ? `To: ${name}` : '';
        cardAgeDisplay.textContent = age ? `Turning ${age}!` : '';
        cardMessageBody.textContent = message ? `"${message}"` : '';
        
        // Hide/show elements if empty
        cardRecipient.style.display = name ? 'block' : 'none';
        cardAgeDisplay.style.display = age ? 'block' : 'none';
        cardMessageBody.style.display = message ? 'block' : 'none';

        triggerCardAnimation();
    }

    // --- Event Listeners for Customization ---
    generateBtn.addEventListener('click', updateCardContent);
    nameInput.addEventListener('input', updateCardContent);
    ageInput.addEventListener('input', updateCardContent);
    messageInput.addEventListener('input', updateCardContent);


    // --- Event Listener for Photo Upload ---
    photoInput.addEventListener('change', (event) => {
        if (event.target.files.length > 0) {
            fileNameSpan.textContent = event.target.files[0].name;
            const file = event.target.files[0];

            const reader = new FileReader();
            reader.onload = (e) => {
                cardImage.src = e.target.result;
                birthdayCard.classList.add('has-image');
                triggerCardAnimation();
            };
            reader.readAsDataURL(file);
        } else {
            fileNameSpan.textContent = 'No file chosen';
            cardImage.src = '';
            birthdayCard.classList.remove('has-image');
        }
    });

    // --- Event Listener for Template Selection ---
    templateCards.forEach(templateCard => {
        templateCard.addEventListener('click', () => {
            templateCards.forEach(card => card.classList.remove('active'));
            templateCard.classList.add('active');

            const selectedTemplateClass = templateCard.dataset.template;
            
            // Reset base classes (and add has-image if it's present)
            let baseClasses = 'instagram-story card-updated';
            if (birthdayCard.classList.contains('has-image')) {
                baseClasses += ' has-image';
            }
            birthdayCard.className = baseClasses;
            
            birthdayCard.classList.add(selectedTemplateClass);
            
            updateCardContent();
            triggerCardAnimation();
        });
    });

    // --- Event Listener for Download Button ---
    downloadBtn.addEventListener('click', () => {
        birthdayCard.classList.remove('card-updated'); 

        html2canvas(birthdayCard, {
            useCORS: true, 
            scale: 3, // This scale: 3 makes the download "clear" and high-resolution
            width: birthdayCard.offsetWidth,
            height: birthdayCard.offsetHeight
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = 'happy-birthday-story.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        });

        triggerCardAnimation();
    });


    // --- Butterfly Animation (Unchanged) ---
    const butterflyContainer = document.querySelector('.butterfly-container');
    const numButterflies = 20; 
    const butterflies = []; 

    for (let i = 0; i < numButterflies; i++) {
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
    
    function animateButterflies(timestamp) {
        if (!startTime) startTime = timestamp;

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

    // Initialize content and template on load
    updateCardContent();
});

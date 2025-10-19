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
    
    // --- NEW: Get butterfly container ---
    const butterflyContainer = document.querySelector('.butterfly-container');

    
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


    // --- NEW: Generate Butterflies ---
    const numberOfButterflies = 15; // How many butterflies you want
    for (let i = 0; i < numberOfButterflies; i++) {
        const butterfly = document.createElement('div');
        butterfly.classList.add('butterfly');
        
        // Randomize initial position
        butterfly.style.left = Math.random() * 100 + 'vw';
        butterfly.style.top = Math.random() * 100 + 'vh';

        // Randomize animation delay and duration slightly for a less synchronized look
        butterfly.style.animationDelay = `${Math.random() * 10}s`;
        butterfly.style.animationDuration = `${15 + Math.random() * 10}s`; // 15-25 seconds
        
        // Randomize color slightly (optional)
        const hue = Math.floor(Math.random() * 60) + 30; // Yellow to orange hues
        butterfly.style.backgroundColor = `hsla(${hue}, 80%, 60%, 0.7)`;
        butterfly.style.boxShadow = `0 0 8px hsla(${hue}, 80%, 60%, 0.5)`;


        butterflyContainer.appendChild(butterfly);
    }

});

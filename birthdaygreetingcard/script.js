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

    
    // --- NEW: Helper function to trigger the animation ---
    function triggerCardAnimation() {
        // Remove the class to reset the animation
        birthdayCard.classList.remove('card-updated');
        
        // This is a small trick to force the browser to restart the animation
        void birthdayCard.offsetWidth; 
        
        // Add the class back to play the animation
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

        // NEW: Trigger the animation
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
                
                // NEW: Trigger the animation
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

});

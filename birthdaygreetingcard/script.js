// Wait for the HTML document to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // Get references to all the input elements
    const nameInput = document.getElementById('nameInput');
    const ageInput = document.getElementById('ageInput');
    const messageInput = document.getElementById('messageInput');
    const generateBtn = document.getElementById('generateBtn');

    // Get references to all the output elements on the card
    const cardRecipient = document.getElementById('cardRecipient');
    const cardAgeDisplay = document.getElementById('cardAgeDisplay');
    const cardMessageBody = document.getElementById('cardMessageBody');

    // Add a 'click' event listener to the button
    generateBtn.addEventListener('click', () => {
        
        // 1. Get the current values from the input fields
        // We use '|| "..."' as a fallback in case the field is empty
        const name = nameInput.value || "...";
        const age = ageInput.value || "...";
        const message = messageInput.value || "Your message will appear here.";

        // 2. Update the text content of the card elements
        cardRecipient.textContent = `To: ${name}`;
        cardAgeDisplay.textContent = `Congratulations on turning ${age}!`;
        cardMessageBody.textContent = `"${message}"`;
    });
});

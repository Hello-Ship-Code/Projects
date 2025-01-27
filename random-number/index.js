"use strict";
const userInput = document.getElementById('user-input');
const result = document.getElementById('result');
const subBtn = document.getElementById('sub-btn');
const cont = document.getElementById('container');
let rand = Math.floor(Math.random() * 10) + 1;
let attempts = 0;
console.log(rand);
subBtn === null || subBtn === void 0 ? void 0 : subBtn.addEventListener('click', () => {
    let inputValue = Number(userInput.value);
    result.style.display = 'none';
    // Check for invalid input
    if (inputValue > 10 || isNaN(inputValue)) {
        result.style.display = 'block';
        result.style.color = '#fff';
        result.style.backgroundColor = '#f44336'; // Red background
        result.textContent = `Enter a valid number between 1-10`;
        return;
    }
    attempts++;
    // Check if the guess is correct
    if (inputValue === rand) {
        result.style.display = 'block';
        result.style.color = '#4a4a4a';
        result.style.backgroundColor = 'rgba(161, 140, 209, 0.2)'; // Reset to original style
        result.textContent = `🎉 Congratulations! You guessed the number ${rand} in ${attempts} attempts!`;
        resetGame();
    }
    else if (inputValue > rand) {
        result.style.display = 'block';
        result.style.color = '#4a4a4a';
        result.style.backgroundColor = 'rgba(161, 140, 209, 0.2)'; // Reset to original style
        result.textContent = `Your guess is too high. Try again!`;
    }
    else {
        result.style.display = 'block';
        result.style.color = '#4a4a4a';
        result.style.backgroundColor = 'rgba(161, 140, 209, 0.2)'; // Reset to original style
        result.textContent = `Your guess is too low. Try again!`;
    }
});
function resetGame() {
    // Create a "Play Again" button
    let playAgainBtn = document.createElement('button');
    playAgainBtn.textContent = "Play Again!";
    playAgainBtn.style.marginTop = '10px';
    playAgainBtn.style.background = '#4caf50';
    playAgainBtn.style.color = '#fff';
    playAgainBtn.addEventListener('click', () => {
        rand = Math.floor(Math.random() * 10) + 1;
        attempts = 0;
        result.style.display = 'none';
        userInput.value = "";
        playAgainBtn.remove();
        subBtn.style.display = 'block';
    });
    subBtn.style.display = 'none';
    cont.appendChild(playAgainBtn);
}

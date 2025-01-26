"use strict";
const btn = document.querySelectorAll('button');
const result = document.getElementById('result');
btn.forEach((button) => {
    button.addEventListener('click', () => {
        if (result) {
            console.log(`Button clicked: ${button.textContent}`);
            result.textContent = button.textContent;
        }
    });
});

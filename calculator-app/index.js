"use strict";
const btn = document.querySelectorAll('button');
const input = document.getElementById('input');
const result = document.getElementById('result');
let output = "";
btn.forEach((button) => {
    button.addEventListener('click', () => {
        if (input && button.textContent !== "=") {
            output += (button.textContent);
            input.textContent = output;
        }
        if (button.textContent === "=" && result && input) {
            result.textContent = (eval(output));
        }
        if (button.textContent === "clear" && input && result) {
            input.textContent = "";
            result.textContent = "";
            output = "";
        }
    });
});

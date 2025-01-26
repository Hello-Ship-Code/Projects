const btn = document.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;
const result = document.getElementById('result') as HTMLButtonElement | null;

btn.forEach((button) => {
    button.addEventListener('click', () => {
        if(result){
            console.log(`Button clicked: ${button.textContent}`);
            result.textContent = button.textContent;
        }
    });
});

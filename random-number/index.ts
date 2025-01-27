const userInput = document.getElementById('user-input') as HTMLInputElement;
const result = document.getElementById('result') as HTMLDivElement;
const container = document.getElementById('container') as HTMLDivElement;
const btn = document.getElementById('sub-btn') as HTMLButtonElement;

let number: number;
let rand: number;


let userNumber: string | null = prompt("choose a number: 1 - 1000 ");

if(!userNumber || isNaN(Number(userNumber)) || Number(userNumber) <=0)
{
    alert("Enter a valid number please!!!");
    number = 100;
} else {
    number = Number(userNumber);
}

userInput.placeholder = `Guess a number 1-${number}`;

rand = Math.floor(Math.random() * number) +1;
let attempts: number = 0;

btn?.addEventListener('click', ()=>{

    let inputValue = Number(userInput.value);
    result.style.display = 'none';

    if( inputValue > number || isNaN(inputValue))
    {
        result.style.display = 'block';
        result.style.color = '#fff';
        result.style.backgroundColor = '#f44336';
        result.textContent = `Enter a number between 1 - ${number}`
    }
     attempts++;

    if(rand === inputValue)
    {
        result.style.display = 'block';
        result.style.color = '#4a4a4a';
        result.style.backgroundColor = 'rgba(161, 140, 209, 0.2)';
        result.textContent = `🎉 Congratulations! You guessed the number ${rand} in ${attempts} attempts!`;
        resetGame();
    }
    else if(inputValue < rand)
    {
        result.style.display = 'block';
        result.style.color = '#4a4a4a';
        result.style.backgroundColor = 'rgba(161, 140, 209, 0.2)';
        result.textContent = `Your guess is too low. Try again!`
    }
    else{
        result.style.display = 'block';
        result.style.color = '#4a4a4a';
        result.style.backgroundColor = 'rgba(161, 140, 209, 0.2)';
        result.textContent = `Your guess is too high. Try again!`
    }
});

function resetGame(){
    const resetBtn = document.createElement('button');
    resetBtn.textContent = "Play Again!!!";
    resetBtn.style.marginTop = '10px';
    resetBtn.style.background = '#4caf50'; 
    resetBtn.style.color = '#fff';
    resetBtn.addEventListener('click',()=>{
        let userNumber: string | null = prompt("choose a number: 1 - 1000 ");
        let number: number = Number(userNumber);
        let rand = Math.floor(Math.random() * number) +1;
        attempts = 0;
        result.style.display = "none";
        userInput.value ="";
        btn.style.display = "block";
        resetBtn.remove();
    });
    btn.style.display = "none";
    container.appendChild(resetBtn);
}

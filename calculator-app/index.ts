const btn = document.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;
const input = document.getElementById('input') as HTMLButtonElement | null;
const result = document.getElementById('result') as HTMLButtonElement | null;


let output = "";
btn.forEach((button) => {
    button.addEventListener('click',
        () => {
        if(input && button.textContent !== "="){
            output += (button.textContent);
            input.textContent = output;
            
        }
        if( button.textContent === "=" && result && input){
            result.textContent = (eval(output)); 
        }
        if(button.textContent === "clear" && input && result)
        {
            input.textContent = "";
            result.textContent = "";
        }
    });
}
);




const digit_clock = document.getElementById('clock') as HTMLElement | null;
const digit_date = document.getElementById('date') as HTMLElement | null;

function formatNumber(value: number, digits: number = 2): string{
    return value.toString().padStart(digits,'2');
}

function updateClock(): void{
    if(digit_clock){
        const time = new Date();

        const hours: string = formatNumber(time.getHours());
        const minutes: string = formatNumber(time.getMinutes());
        const seconds: string = formatNumber(time.getSeconds());
        
        digit_clock.innerText = `${hours}:${minutes}:${seconds}`;
    }
}


function updateDate(): void{
    if(digit_date)
    {
        const time = new Date();

        const dayNames: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const monthNames: string[] = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December',
        ];

        const Day: string = dayNames[time.getDay()];
        const date: string = time.getDate().toString();
        const month: string = monthNames[time.getMonth()];
        const year: string = time.getFullYear().toString();

        digit_date.innerText = `${Day}, ${date} | ${month} | ${year}`

        
    }
}

function initialize(): void{
    updateClock();
    updateDate();
}

setInterval(initialize,1000);
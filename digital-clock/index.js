"use strict";
const digit_clock = document.getElementById('clock');
const digit_date = document.getElementById('date');
function formatNumber(value, digits = 2) {
    return value.toString().padStart(digits, '2');
}
function updateClock() {
    if (digit_clock) {
        const time = new Date();
        const hours = formatNumber(time.getHours());
        const minutes = formatNumber(time.getMinutes());
        const seconds = formatNumber(time.getSeconds());
        digit_clock.innerText = `${hours}:${minutes}:${seconds}`;
    }
}
function updateDate() {
    if (digit_date) {
        const time = new Date();
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December',
        ];
        const Day = dayNames[time.getDay()];
        const date = time.getDate().toString();
        const month = monthNames[time.getMonth()];
        const year = time.getFullYear().toString();
        digit_date.innerText = `${Day}, ${date} | ${month} | ${year}`;
    }
}
function initialize() {
    updateClock();
    updateDate();
    setInterval(updateClock, 1000);
    setInterval(updateDate, 86400000);
}
initialize();

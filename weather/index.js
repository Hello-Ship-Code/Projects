"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API_KEY = "26b33ad1a29a4b45be1184458253001"; // Replace with your actual API key
const userInput = document.getElementById("user-input");
const button = document.getElementById("sub-btn");
const display = document.getElementById('weather-info');
button.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    let city = userInput.value.trim();
    if (!city) {
        alert("⚠️ Please enter a valid city name!");
        return;
    }
    // Corrected API URL (Using HTTPS & Encoding Input)
    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=no`;
    try {
        const response = yield fetch(url);
        if (!response.ok) {
            const errorData = yield response.json();
            throw new Error(`Error ${response.status}: ${errorData.error.message}`);
        }
        const data = yield response.json();
        display.style.display = 'block';
        display.textContent = `🌤 Weather in ${data.location.name}: ${data.current.temp_c}°C, ${data.current.condition.text}`;
    }
    catch (error) {
        console.error("Error fetching data:", error);
        alert(`❌ ${error.message}`);
    }
}));

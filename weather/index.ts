const API_KEY = "26b33ad1a29a4b45be1184458253001"; // Replace with your actual API key
const userInput = document.getElementById("user-input") as HTMLInputElement;
const button = document.getElementById("sub-btn") as HTMLButtonElement;
const display = document.getElementById('weather-info') as HTMLParagraphElement;

button.addEventListener("click", async () => {
    let city = userInput.value.trim();

    if (!city) {
        alert("⚠️ Please enter a valid city name!");
        return;
    }

    // Corrected API URL (Using HTTPS & Encoding Input)
    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=no`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${errorData.error.message}`);
        }

        const data = await response.json();
        display.style.display = 'block';
        display.textContent = `🌤 Weather in ${data.location.name}: ${data.current.temp_c}°C, ${data.current.condition.text}`;

    } catch (error: any) {
        console.error("Error fetching data:", error);
        alert(`❌ ${error.message}`);
    }
});

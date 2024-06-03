async function get_weather() {
    let datepick = document.getElementById("dateInput").value;
    date = datepick;

    const apiUrl = `https://archive-api.open-meteo.com/v1/archive?latitude=-45.0302&longitude=168.6627&start_date=${date}&end_date=${date}&daily=temperature_2m_max&timezone=Pacific%2FAuckland`

    await fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            temperature = data.daily.temperature_2m_max[0]
            document.getElementById("temperature").innerHTML = temperature + "°";
            document.getElementById("date").textContent = datepick
            document.getElementById("temperature_heading").textContent = "Max Temperature:"
        })
        .catch(error => {
            console.error('Error:', error)
            document.getElementById("date").textContent = "Invalid Date"
            document.getElementById("temperature").textContent = ""
            document.getElementById("temperature_heading").textContent = ""
        });
        
    }

    
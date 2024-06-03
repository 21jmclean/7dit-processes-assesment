async function get_weather() {
    let datepick = document.getElementById("dateInput").value;
    date = datepick;

    const apiUrl = `https://archive-api.open-meteo.com/v1/archive?latitude=-45.0302&longitude=168.6627&start_date=${date}&end_date=${date}&daily=temperature_2m_max&daily=temperature_2m_min&timezone=Pacific%2FAuckland`

    await fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            temperature_max = data.daily.temperature_2m_max[0]
            temperature_min = data.daily.temperature_2m_min[0]
            document.getElementById("date").textContent = datepick
            document.getElementById("temperature_max").innerHTML = temperature_max + "°"
            document.getElementById("temperature_heading_max").textContent = "Max Temperature:"
            document.getElementById("temperature_min").innerHTML = temperature_min + "°"
            document.getElementById("temperature_heading_min").textContent = "Min Temperature:"
        })

        .catch(error => {
            console.error('Error:', error)
            document.getElementById("date").textContent = "Invalid Date"
            document.getElementById("temperature_max").innerHTML = ""
            document.getElementById("temperature_heading_max").innerHTML= ""
            document.getElementById("temperature_min").innerHTML = ""
            document.getElementById("temperature_heading_min").innerHTML = ""
            
        });
         
    }

    
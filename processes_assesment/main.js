let temperature = ""
let datepick = ""

function get_date() {
    let datepick = document.getElementById("dateInput").value;
    document.getElementById("date").textContent = datepick;
    get_weather()
}

function get_weather() {
    let date = datepick
    const apiUrl = `https://archive-api.open-meteo.com/v1/archive?latitude=-45.0302&longitude=168.6627&start_date=${date}&end_date=${date}&daily=temperature_2m_max&timezone=Pacific%2FAuckland`

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            temperature = data.daily.temperature_2m_max[0]

        })
        .catch(error => {
            console.error('Error:', error);
        });
        
        console.log(temperature)
        document.getElementById("temperature").innerHTML = temperature + "°";
    }

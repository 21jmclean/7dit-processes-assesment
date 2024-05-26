const apiurl = "https://archive-api.open-meteo.com/v1/archive?latitude=-45.0302&longitude=168.6627&start_date=2024-05-25&end_date=2024-05-25&daily=temperature_2m_max&timezone=Pacific%2FAuckland"

fetch(apiurl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data.daily.temperature_2m_max[0])
    })
    .catch(error => {
        console.error('Error:', error);
    });

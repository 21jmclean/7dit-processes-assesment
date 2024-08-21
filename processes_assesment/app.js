async function call_api() {
    // Hidden API key.
    
    const STOCK_API_KEY = config.STOCK_API_KEY
    const GEOCODE_API_KEY = config.GEOCODE_API_KEY


    let datepick = document.getElementById("date_input").value;
    let date = datepick;
    let location = document.getElementById("location_input").value;
    let lat = 0
    let lon = 0
    let valid_location = 1


    // List to translate weather codes in to words.
    const weather_code_id = [
        "Clear sky",
        "Clouds dissolving",
        "Sky unchanged",
        "Clouds forming",
        "Visibility reduced by smoke",
        "Haze",
        "Widespread dust in the air",
        "Dust or sand raised by wind",
        "Dust or sand whirls",
        "Duststorm or sandstorm",
        "Mist",
        "Patches of fog or ice fog",
        "Continuous fog or ice fog",
        "Lightning visible, no thunder heard",
        "Precipitation not reaching ground",
        "Distant precipitation",
        "Nearby precipitation",
        "Thunderstorm, no precipitation",
        "Squalls",
        "Funnel cloud",
        "Drizzle or snow grains",
        "Rain",
        "Snow",
        "Rain and snow or ice pellets",
        "Freezing drizzle or freezing rain",
        "Shower of rain",
        "Shower of snow, or of rain and snow",
        "Shower of hail, or of rain and hail",
        "Fog or ice fog",
        "Thunderstorm (with or without precipitation)",
        "Slight or moderate duststorm or sandstorm",
        "Severe duststorm or sandstorm",
        "Slight or moderate blowing snow",
        "Heavy drifting snow",
        "Slight or moderate blowing snow, generally high",
        "Heavy drifting snow",
        "Distant fog or ice fog, extending above observer",
        "Patches of fog or ice fog",
        "Fog or ice fog, becoming thinner",
        "Fog or ice fog, sky invisible",
        "Fog or ice fog, no change",
        "Fog or ice fog, sky invisible",
        "Fog or ice fog, becoming thicker",
        "Fog or ice fog, sky invisible",
        "Fog depositing rime, sky visible",
        "Fog depositing rime, sky invisible",
        "Drizzle, intermittent slight",
        "Drizzle, continuous",
        "Drizzle, intermittent moderate",
        "Drizzle, continuous",
        "Drizzle, intermittent heavy",
        "Drizzle, continuous",
        "Drizzle, freezing, slight",
        "Drizzle, freezing, moderate or heavy",
        "Drizzle and rain, slight",
        "Drizzle and rain, moderate or heavy",
        "Rain, intermittent slight",
        "Rain, continuous",
        "Rain, intermittent moderate",
        "Rain, continuous",
        "Rain, intermittent heavy",
        "Rain, continuous",
        "Rain, freezing, slight",
        "Rain, freezing, moderate or heavy",
        "Rain or drizzle and snow, slight",
        "Rain or drizzle and snow, moderate or heavy",
        "Intermittent fall of snowflakes, slight",
        "Continuous fall of snowflakes",
        "Intermittent fall of snowflakes, moderate",
        "Continuous fall of snowflakes",
        "Intermittent fall of snowflakes, heavy",
        "Continuous fall of snowflakes",
        "Diamond dust (with or without fog)",
        "Snow grains (with or without fog)",
        "Isolated star-like snow crystals (with or without fog)",
        "Ice pellets",
        "Rain shower, slight",
        "Rain shower, moderate or heavy",
        "Rain shower, violent",
        "Shower of rain and snow mixed, slight",
        "Shower of rain and snow mixed, moderate or heavy",
        "Snow shower, slight",
        "Snow shower, moderate or heavy",
        "Shower of snow pellets or small hail, slight",
        "Shower of snow pellets or small hail, moderate or heavy",
        "Shower of hail, slight",
        "Shower of hail, moderate or heavy",
        "Slight rain, thunderstorm before but not at observation",
        "Moderate or heavy rain, thunderstorm before but not at observation",
        "Slight snow, or rain and snow mixed or hail at observation",
        "Moderate or heavy snow, or rain and snow mixed or hail at observation",
        "Thunderstorm, slight or moderate, without hail but with rain and/or snow at observation",
        "Thunderstorm, slight or moderate, with hail at observation",
        "Thunderstorm, heavy, without hail but with rain and/or snow at observation",
        "Thunderstorm combined with duststorm or sandstorm at observation",
        "Thunderstorm, heavy, with hail at observation"
    ];
    

    // This fetch method gets info from a geocoding API. The 
    const  geocode_apiurl = `https://geocode.maps.co/search?q=${location}&api_key=${GEOCODE_API_KEY}`
    console.log(geocode_apiurl)

    await fetch(geocode_apiurl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if(data[0] == null || data[0].class == "building") {
                valid_location = 0
                throw new Error("Invalid Location")
            }
            
            let full_location = data[0].display_name
            let short_location = full_location.split(",")[0]
            let country = ""
            let i = 4

            // This code iterates through an array of the returned location from the geocoding API. 
            // It then selects the last item of the list which will hold the name of the country.
            while(i >= 0) {
                if (typeof full_location.split(",")[i] !== 'undefined') {
                    country = full_location.split(",")[i]
                    break
                }

            else{
                i -= 1
            }};

            let town = ""
            let area = ""
            let rest_of_location = ""
            
            // It then checks whether the returned location is in the first or second item of the array.
            // If it is, It means that the location the user entered in acountry rather than a town or city.
            // If this happens, the values for the town and area are set to become empty.
            // This will make the program only display required information. 
            // Eg. if they enter a country, only the country name will be entered
            // But if they enter  town or city,  the town name, the province name, and the country name will be displayed.
            if (i == 0 || i == 1){
                town = ""
                area = ""
            }

            else{
                town = `${full_location.split(",")[1]}, `
                area = `${full_location.split(",")[2]}, `
                rest_of_location = town + area + country
            }

            full_location.split(",")[1]
            document.getElementById("location_title").textContent = short_location
            document.getElementById("rest_of_location").textContent = rest_of_location
            lat = data[0].lat
            lon = data[0].lon
        })

        .catch(error => {
            console.error("Error:", error)
        })
        
    const weather_apiUrl = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${date}&end_date=${date}&daily=temperature_2m_max&daily=temperature_2m_min&daily=weather_code&timezone=Pacific%2FAuckland`
    // const aapl_stock_apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&outputsize=full&symbol=AAPL&apikey=${STOCK_API_KEY}`
    const aapl_stock_apiUrl = "apple-stock.json"
    // const msft_stock_apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&outputsize=full&symbol=MSFT&apikey=${STOCK_API_KEY}`
    const msft_stock_apiUrl = "microsoft-stock.json"
    const goog_stock_apiUrl = "google-stock.json"
    // const nzd_usd_rateUrl = `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=USD&to_symbol=NZD&outputsize=full&apikey=${STOCK_API_KEY}`
    const nzd_usd_rateUrl = "nzd-usd_rate.json"
    // const nzd_usd_rateUrl = `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=GBP&to_symbol=NZD&outputsize=full&apikey=${STOCK_API_KEY}`
    const nzd_gbp_rateUrl = "nzd-gbp_rate.json"
    // const nzd_usd_rateUrl = `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=EUR&to_symbol=NZD&outputsize=full&apikey=${STOCK_API_KEY}`
    const nzd_eur_rateUrl = "nzd-eur_rate.json"
    


    // This fetch method gets from a weather API and takes paramaters from the date input field. 
    await fetch(weather_apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            if(valid_location == 0){
                throw new Error("Invalid Location")
            }

            return response.json();
        })

        // Update HTML Elements with weather data returned from the API. 
        .then(data => {
            if(data.daily.temperature_2m_max[0] != null) {
                temperature_max = data.daily.temperature_2m_max[0]
                temperature_min = data.daily.temperature_2m_min[0]
                weather = weather_code_id[data.daily.weather_code[0]]
                document.getElementById("date").textContent = datepick
                document.getElementById("weather_code_heading").textContent = "Weather:"
                document.getElementById("weather_code").innerHTML = weather
                document.getElementById("temperature_max").innerHTML = temperature_max + "°"
                document.getElementById("temperature_heading_max").textContent = "Max Temperature (C°):"
                document.getElementById("temperature_min").innerHTML = temperature_min + "°"
                document.getElementById("temperature_heading_min").textContent = "Min Temperature (C°):"
            }

            else {
                throw new Error("No Data")
            }
          
        })

        // Clear the data displayed on the page when an error occurs (Eg. If an invalid date is selected or there is a network error.)
        .catch(error => {
            console.error('Error:', error)
            document.getElementById("location_title").textContent = "Invalid Date/location"
            document.getElementById("rest_of_location").textContent = ""
            document.getElementById("weather_code_heading").textContent = ""
            document.getElementById("weather_code").innerHTML = ""
            document.getElementById("temperature_max").innerHTML = ""
            document.getElementById("temperature_heading_max").innerHTML= ""
            document.getElementById("temperature_min").innerHTML = ""
            document.getElementById("temperature_heading_min").innerHTML = ""
            
        });
        
        // Gets data from the stock API/json file for the stock AAPL
        await fetch(aapl_stock_apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })

            // Update HTML Elements with stock data returned from the API. 
            .then(data => {
                aapl_close = data["Time Series (Daily)"][date]["4. close"]
                aapl_close = (Math.round(aapl_close * 100))/100
                document.getElementById("apple").textContent = "Apple:"
                document.getElementById("apple_stock_price").textContent = `$${aapl_close}`

            })

            // Clears data displayed on page when an error occurs.
            .catch(error => {
                console.error('Error:', error)
                document.getElementById("apple").textContent = "No Stocks For This Date"
                document.getElementById("apple_stock_price").textContent = ""

            });

        // Gets data from the stock API/json file for the stock MSFT
        await fetch(msft_stock_apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })

            // Update HTML Elements with stock data returned from the API. 
            .then(data => {
                msft_close = data["Time Series (Daily)"][date]["4. close"]
                msft_close = (Math.round(msft_close * 100))/100
                document.getElementById("microsoft").textContent = "Microsoft:"
                document.getElementById("microsoft_stock_price").textContent = `$${msft_close}`

            })

            // Clears data displayed on page when an error occurs.
            .catch(error => {
                console.error('Error:', error)
                document.getElementById("microsoft").textContent = ""
                document.getElementById("microsoft_stock_price").textContent = ""

            });

            
        // Gets data from the stock API/json file for the stock MSFT
        await fetch(goog_stock_apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })

            // Update HTML Elements with stock data returned from the API. 
            .then(data => {
                goog_close = data["Time Series (Daily)"][date]["4. close"]
                goog_close = (Math.round(goog_close * 100))/100
                document.getElementById("google").textContent = "Google:"
                document.getElementById("google_stock_price").textContent = `$${goog_close}`

            })

            // Clears data displayed on page when an error occurs.
            .catch(error => {
                console.error('Error:', error)
                document.getElementById("google").textContent = ""
                document.getElementById("google_stock_price").textContent = ""

            });


        await fetch(nzd_usd_rateUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })

            // Update HTML Elements with stock data returned from the API. 
            .then(data => {
                nzd_usd_rate_close = data["Time Series FX (Daily)"][date]["4. close"]
                nzd_usd_rate_close = (Math.round(nzd_usd_rate_close * 100))/100
                document.getElementById("nzd-usd").textContent = "NZD to USD:"
                document.getElementById("nzd-usd_rate").textContent = `$1 USD = $${nzd_usd_rate_close} NZD`
            })

            // Clears data displayed on page when an error occurs.
            .catch(error => {
                console.error('Error:', error)
                document.getElementById("nzd-usd").textContent = "NZD to USD"
                document.getElementById("nzd-usd_rate").textContent = "Unavailable for this date"

            });

        await fetch(nzd_gbp_rateUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })

            // Update HTML Elements with stock data returned from the API. 
            .then(data => {
                nzd_gbp_rate_close = data["Time Series FX (Daily)"][date]["4. close"]
                nzd_gbp_rate_close = (Math.round(nzd_gbp_rate_close * 100))/100
                document.getElementById("nzd-gbp").textContent = "NZD to GBP:"
                document.getElementById("nzd-gbp_rate").textContent = `£1 GBP = $${nzd_gbp_rate_close} NZD`
            })

            // Clears data displayed on page when an error occurs.
            .catch(error => {
                console.error('Error:', error)
                document.getElementById("nzd-gbp").textContent = "NZD to GBP:"
                document.getElementById("nzd-gbp_rate").textContent = "Unavailable for this date"

            });

        await fetch(nzd_eur_rateUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })

            // Update HTML Elements with stock data returned from the API. 
            .then(data => {
                nzd_eur_rate_close = data["Time Series FX (Daily)"][date]["4. close"]
                nzd_eur_rate_close = (Math.round(nzd_eur_rate_close * 100))/100
                document.getElementById("nzd-eur").textContent = "NZD to EUR:"
                document.getElementById("nzd-eur_rate").textContent = `€1 EUR = $${nzd_eur_rate_close} NZD`
            })

            // Clears data displayed on page when an error occurs.
            .catch(error => {
                console.error('Error:', error)
                document.getElementById("nzd-eur").textContent = "NZD to EUR"
                document.getElementById("nzd-eur_rate").textContent = "Unavailable for this date"

            });
        }

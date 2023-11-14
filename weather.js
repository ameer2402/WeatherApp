
async function fetchWeatherData(city) {

  const apiKey='95f5dd0621msh3d59a37ddc16bd6p1bb7a4jsn53787a9a9b9b';
  const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`;
	try {
		const response = await fetch(url,{
      headers: {
        'X-RapidAPI-Key': '95f5dd0621msh3d59a37ddc16bd6p1bb7a4jsn53787a9a9b9b',
        'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
      }
    });
    
	if(response.ok){
		cityInput.innerHTML=city
		const result = await response.json();
		const temp = result.temp;
		const humidity = result.humidity;
		const wind_speed=result.wind_speed;
		const wind_degrees=result.wind_degrees;
		const windDirection = getWindDirection(wind_degrees);
		const feels_like=result.feels_like;
		const cloud_pct=result.cloud_pct;
		const min_temp=result.min_temp;
		const max_temp=result.max_temp;
		const sunriseTime = new Date(result.sunrise * 1000); 
		const sunsetTime = new Date(result.sunset * 1000); 

		function getWindDirection(degrees) {
			
			const directions = ["North", "North-East", "East", "South-East", "South", "South-West", "West", "North-West"];
			const degreeRanges = [22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5];
		
			
			for (let i = 0; i < degreeRanges.length; i++) {
				if (degrees < degreeRanges[i]) {
					return directions[i];
				}
			}
		
			return directions[0]; 
		}
		
            
	
		
		const formattedSunrise = sunriseTime.toLocaleTimeString('en-US', { timeStyle: 'short' });
		const formattedSunset = sunsetTime.toLocaleTimeString('en-US', { timeStyle: 'short' });
		
        console.log(JSON.stringify(result, null, 2));
		
		document.getElementById('temp').textContent = temp;
		document.getElementById('feels_like').textContent = feels_like;
		document.getElementById('humidity').textContent = humidity;
		document.getElementById('wind_speed').textContent = wind_speed;
		document.getElementById('wind_direction').textContent = windDirection;
		document.getElementById('min_temp').textContent = min_temp;
		document.getElementById('max_temp').textContent = max_temp;
		document.getElementById('sunrise').textContent = formattedSunrise;
		document.getElementById('sunset').textContent = formattedSunset;
		
		document.getElementById('wind_degrees').textContent = wind_degrees;
		document.getElementById('cloud_pct').textContent = cloud_pct;
		
	}
	else{
		alert("City not found. Please enter a valid city name.");
	}
		
	} catch (error) {
		console.error(error);
	}
}
const submit = document.getElementById('submit'); // replace 'submit' with your button's id
const city = document.getElementById('city'); // replace 'city' with your input field's id

submit.addEventListener("click", async (e) => {
  e.preventDefault();
  
  
  await fetchWeatherData(city.value);
  
  // Clear the input field after fetching the data
  city.value = "";
});

window.onload = () => {
  fetchWeatherData("Delhi");
};
// fetchWeatherData("Delhi");

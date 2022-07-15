const APP_ID = 'bcf53cdb8a1be04828df4e351082730e'; //api key de la pagina del clima

const fetchData = position => {
    const { latitude, longitude} = position.coords;//del objeto position agregamos el valor de latitude y longitude a coords
    fetch(`https://api.openweathermap.org/data/2.5/weather?lang=es&units=metric&lat=${latitude}&lon=${longitude}&units=metric&appid=${APP_ID}`)//llamamos a la api con sus parametros
        .then(response => response.json())//pasamos a objeto la respuesta
        .then(data => setWeatherData(data));//usamos la funcion setWeatherData
}

const setWeatherData = data =>{
	const weatherData = {
		location: data.name,
		description: data.weather[0].main,
		humidity: data.main.humidity,
		pressure: data.main.pressure,
		temperature: data.main.temp,
		temp_min: data.main.temp_min,
		temp_max: data.main.temp_max,
		date: getDate(),
	}
	document.getElementById('icon').classList.add(weatherData.description)
	Object.keys(weatherData).forEach( key => {
		document.getElementById(key).textContent = weatherData[key];
	});
	cleanup();

		
}

const cleanup = () =>{
	let app = document.getElementById('app');
	let loader = document.getElementById('loader');
	loader.style.display = 'none';
	app.style.display = 'flex';
}
const getDate = () =>{
	let date = new Date();
	return `${date.getDate()} - ${date.getMonth() + 1} - ${date.getFullYear()}`
}
const onLoad = () => {
	navigator.geolocation.getCurrentPosition(fetchData);
}

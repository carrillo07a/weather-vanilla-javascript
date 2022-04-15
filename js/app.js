(function () {
	'use strict';

	window.addEventListener('load', () => {
		let mainWeatherAnimation = {
			Thunderstorm: 'animated/thunder.svg',
			Drizzle: 'animated/rainy-2.svg',
			Rain: 'animated/rainy-7.svg',
			Snow: 'animated/snowy-6.svg',
			Clear: 'animated/day.svg',
			Atmosphere: 'animated/weather.svg',
			Clouds: 'animated/cloudy-day-1.svg',
			default: 'animated/cloudy-day-1.svg',
		};

		let weatherProperties = {
			temperature: {
				value: document.getElementById('temperature-value'),
				description: document.getElementById('temperature-description'),
			},
			location: {
				value: document.getElementById('location-value'),
				icon: document.getElementById('location-icon'),
			},
			wind: {
				velocity: document.getElementById('wind-velocity'),
			},
		};

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				let lon = position.coords.longitude;
				let lat = position.coords.latitude;
				const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=00563e3536ed93f185e8f05622cf4642`;

				fetch(url)
					.then((response) => response.json())
					.then((data) => {
						console.log(data);
						if (data.weather.length) {
							let temperature = Math.round(data.main.temp);
							weatherProperties.temperature.value.textContent = `${temperature} ° C`;
							weatherProperties.temperature.description.textContent = data.weather[0].description.toUpperCase();
							weatherProperties.location.value.textContent = data.name;
							weatherProperties.wind.velocity.textContent = `${data.wind.speed} m/s`;
							let current = mainWeatherAnimation[data.weather[0].main];
							weatherProperties.location.icon.src = current ? current : mainWeatherAnimation.default;
						}
					})
					.catch((error) => {
						console.log(error);
					});
			});
		}
	});
})();

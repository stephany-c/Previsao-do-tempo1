import './WeatherInformation.css';

function WeatherInformation({ weather }) {
    // Converte os timestamps da API para um formato legível
    const formatTime = (timestamp) => {
        return new Date(timestamp * 1000).toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    const lastUpdate = formatTime(weather.dt);
    const sunriseTime = formatTime(weather.sys.sunrise);
    const sunsetTime = formatTime(weather.sys.sunset);

    return (
        <div className="weather-container">
            <h2>{weather.name}</h2>
            <p className="update-time">Última atualização: {lastUpdate}</p>

            <div className='weather-info'>
                <img
                    alt='icone-tempo'
                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                />
                <p className='temperature'>{Math.round(weather.main.temp)}°C</p>
            </div>

            <div>
                <p className='description'>{weather.weather[0].description}</p>
            </div>

            <div className='details'>
                <div><p>Sensação térmica: {Math.round(weather.main.feels_like)}°C</p></div>
                <div><p>Umidade: {weather.main.humidity}%</p></div>
                <div><p>Pressão: {weather.main.pressure} hPa</p></div>

            </div>
        </div>
    );
}

export default WeatherInformation;

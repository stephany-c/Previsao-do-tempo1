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
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                />
                <p className='temperature'>{Math.round(weather.main.temp)}°C</p>
            </div>

            <div>
                <p className='description'>{weather.weather[0].description}</p>
            </div>

            <div className='details'>
                <div className='detail-item'>
                    <span className='detail-label'>Sensação térmica</span>
                    <span className='detail-value'>{Math.round(weather.main.feels_like)}°C</span>
                </div>
                <div className='detail-item'>
                    <span className='detail-label'>Umidade</span>
                    <span className='detail-value'>{weather.main.humidity}%</span>
                </div>
                <div className='detail-item'>
                    <span className='detail-label'>Pressão</span>
                    <span className='detail-value'>{weather.main.pressure} hPa</span>
                </div>
                <div className='detail-item'>
                    <span className='detail-label'>Vento</span>
                    <span className='detail-value'>{Math.round(weather.wind.speed * 3.6)} km/h</span>
                </div>
                <div className='detail-item'>
                    <span className='detail-label'>Nascer do sol</span>
                    <span className='detail-value'>{sunriseTime}</span>
                </div>
                <div className='detail-item'>
                    <span className='detail-label'>Pôr do sol</span>
                    <span className='detail-value'>{sunsetTime}</span>
                </div>
            </div>
        </div>
    );
}

export default WeatherInformation;

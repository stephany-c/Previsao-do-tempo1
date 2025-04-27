import './WeatherInformations5Days.css';

function WeatherInformation5Days({ weather5Days }) {
    let dailyForecast = {};

    for (let forecast of weather5Days.list) {
        const date = new Date(forecast.dt * 1000).toLocaleDateString();
        if (!dailyForecast[date]) {
            dailyForecast[date] = forecast;
        }
    }

    const next5DaysForecast = Object.values(dailyForecast).slice(1, 6);
    console.log(next5DaysForecast);

    return (
        <div className="weather-container">
            <h3>Previsão próximos 5 dias</h3>

            <div className='weather-list'>
                {next5DaysForecast.map((forecast) => {
                    const dateObj = new Date(forecast.dt * 1000);
                    const dayOfWeek = dateObj.toLocaleDateString("pt-BR", { weekday: "long" });
                    const dayNumber = dateObj.toLocaleDateString("pt-BR", { day: "numeric" });

                    return (
                        <div className='weather-item' key={forecast.dt}  >
                            <p>{dayOfWeek}, {dayNumber}</p>
                            <img
                                src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                                alt={forecast.weather[0].description}
                            />
                            <p>{forecast.weather[0].description}</p>
                            <p>{Math.round(forecast.main.temp_min)}°C min / {Math.round(forecast.main.temp_max)}°C máx</p>
                        </div>
                    );
                })}

            </div>
        </div>
    );
}

export default WeatherInformation5Days;

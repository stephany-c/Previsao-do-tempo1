import { useState, useRef } from 'react'
import axios from 'axios'
import './App.css'
import WeatherInformation from './components/WeatherInformations/WeatherInformation'
import WeatherInformation5Days from './components/WeatherInformations5Days/WeatherInformations5Days'

function App() {
  const [weather, setWeather] = useState()
  const [weather5Days, setWeather5Days] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef()

  async function searchCity(cityName) {
    const city = (typeof cityName === 'string' ? cityName : inputRef.current.value).trim()

    if (!city) {
      setError('Digite o nome de uma cidade.')
      return
    }

    if (inputRef.current) {
      inputRef.current.value = city
    }

    setLoading(true)
    setError('')

    const key = 'a65b2d96f2def614842300a4d041f408'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`
    const url5Days = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&lang=pt_br&units=metric`

    try {
      const [apiInfo, apiInfo5Days] = await Promise.all([
        axios.get(url),
        axios.get(url5Days),
      ])
      setWeather(apiInfo.data)
      setWeather5Days(apiInfo5Days.data)
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('Cidade não encontrada. Verifique o nome e tente novamente.')
      } else {
        setError('Não foi possível buscar a previsão. Tente novamente.')
      }
      setWeather(undefined)
      setWeather5Days(undefined)
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      searchCity()
    }
  }

  return (
    <div className="container">
      <header className="app-header">
        <h1>Previsão do Tempo</h1>
        <p className="subtitle">Veja o clima atual e os próximos 5 dias de qualquer cidade</p>
      </header>

      <div className="search-container">
        <input
          ref={inputRef}
          type="text"
          placeholder="Digite o nome da cidade"
          onKeyDown={handleKeyDown}
        />
        <button onClick={searchCity} disabled={loading}>
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {!weather && !error && !loading && (
        <div className="welcome-state">
          <div className="welcome-icon" aria-hidden="true">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v2" />
              <path d="m4.93 4.93 1.41 1.41" />
              <path d="M20 12h2" />
              <path d="m19.07 4.93-1.41 1.41" />
              <path d="M15.947 12.65a4 4 0 0 0-5.925-4.128" />
              <path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z" />
            </svg>
          </div>
          <h2>Qual cidade você quer consultar?</h2>
          <p>Busque por qualquer cidade do mundo ou comece por uma das sugestões abaixo.</p>
          <div className="suggestions">
            {['São Paulo', 'Rio de Janeiro', 'Lisboa', 'Tóquio', 'Nova York', 'Paris'].map((city) => (
              <button
                key={city}
                className="suggestion-chip"
                onClick={() => searchCity(city)}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      )}

      {weather && <WeatherInformation weather={weather} />}
      {weather5Days && <WeatherInformation5Days weather5Days={weather5Days} />}
    </div>
  )
}

export default App

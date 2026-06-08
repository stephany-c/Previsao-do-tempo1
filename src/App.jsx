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

  async function searchCity() {
    const city = inputRef.current.value.trim()

    if (!city) {
      setError('Digite o nome de uma cidade.')
      return
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

      {weather && <WeatherInformation weather={weather} />}
      {weather5Days && <WeatherInformation5Days weather5Days={weather5Days} />}
    </div>
  )
}

export default App

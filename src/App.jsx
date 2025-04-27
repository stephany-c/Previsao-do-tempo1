import { useState, useRef } from 'react'
import axios from 'axios'
import './App.css'
import WeatherInformation from './components/WeatherInformations/WeatherInformation'
import WeatherInformation5Days from './components/WeatherInformations5Days/WeatherInformations5Days'



function App() {
  const [weather, setWeather] = useState()
  const [weather5Days, setWeather5Days] = useState()
  const inputRef = useRef()


  async function searchCity() {
    console.log(inputRef.current.value)
    const city = inputRef.current.value
    const key = "a65b2d96f2def614842300a4d041f408"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`
    const url5Days = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&lang=pt_br&units=metric`
    //chamada da api
    const apiInfo = await axios.get(url)
    const apiInfo5Days = await axios.get(url5Days)
    console.log(apiInfo5Days)
    setWeather5Days(apiInfo5Days.data)
    setWeather(apiInfo.data)



  }

  return (
    <div className='container'>
      <h1> Previsão do Tempo </h1>
      <input ref={inputRef} type='text' placeholder='Digite o nome da cidade'>
      </input>
      <button onClick={searchCity}>Buscar</button>
      {weather && <WeatherInformation weather={weather} />}
      {weather5Days && <WeatherInformation5Days weather5Days={weather5Days} />}
    </div>

  )
}

export default App

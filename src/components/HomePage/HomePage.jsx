import React from 'react'
import './HomePage.css'

const HomePage = () => {
  return (
    <div className='home'>
        <h1>Выберите свой путь</h1>
        <a href="/weather"><input className='weather-btn btn' type="button" value='Погода' /></a>
        <a href="/current"><input className='current-btn btn' type="button" value='Валюта' /></a>
    </div>
  )
}

export default HomePage
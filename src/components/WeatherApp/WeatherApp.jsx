import React, { useEffect, useState } from "react";
import "./WeatherApp.css";

const WeatherApp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [data, setData] = useState([]);
  const [city, setCity] = useState("");
  const [error400, setError400 ] = useState(false)
  const [error404, setError404 ] = useState(false)

  const API_KEY = "17f3c2ab795a41cb90b100920231311";

  //! Defaul bishkek town function 
  const defaultBishkek = async() => {
    setIsLoading(true);
    
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=Bishkek&aqi=no`);
      const data = await response.json();
      if(response.status === 200) {
        setIsActive(true);
        setData(data)
        setError400(false)
      } else if(response.status === 400) {
        setError400(true)
      }
      console.log(data);
    } catch (e) {
      console.log(e);
      setError404(true)
    } finally {
      setIsLoading(false);
    }
  }

  //! Main part 

  const getWeather = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`);
      const data = await response.json();
      if(response.status === 200) {
        setIsActive(true);
        setData(data)
        setError400(false)
      } else if(response.status === 400) {
        setIsActive(false)
        setData([])
        setError400(true)
        setCity('')
      }
      console.log(data);
    } catch (e) {
      console.log(e);
      setIsActive(false)
      setData([])
      setError404(true)
      setCity('')
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      defaultBishkek()
    })();
  }, []);


  //! Reset btn 
  const resetF = async () => {
    setIsActive(null)
    setData(null)
    setCity('')
    setError400(false)
    setError404(false)
    defaultBishkek()
  }


  return (
    <div className="weather-page">
      <h1>WeatherApp</h1>
      <a href="/">
        <input className="back btn" type="button" value="На главную" />
      </a>
      <div>
        <input className="input-weather"
          type="text"
          name=""
          id=""
          placeholder="Название города"
          onChange={(e) => {
            return setCity(e.target.value);
          }}
          value={city}
        />
      </div>
      <div>
        <input className="btn-weather btn" type="button" value="Искать" onClick={getWeather} />
        <input className="btn-weather btn" type="button" value="Сбросить" onClick={resetF} />
      </div>

      <div className="weather">
        <div className="town-country">
          {isActive && (
            <div>
              {isLoading ? (
                <div></div>
              ) : (
                <div className="country">Страна: {data.location.country}</div>
              )}
            </div>
          )}

          {isActive && (
            <div>
              {isLoading ? (
                <div></div>
              ) : (
                <div>Город: {data.location.name}</div>
              )}
            </div>
          )}
        </div>


        {isActive && (
            <div>
              {isLoading ? (
                <div className="loading-weather">Loading...</div>
              ) : (
                <div className="temperature">{data.current.temp_c} C°</div>
              )}
            </div>
          )}

          {error400 && <div>В запросе есть синтаксическая ошибка!</div> }
          {error404 && <div>Сервер не пашет!</div> }

        <div className="param">
          {isActive && (
            <div>
              {isLoading ? (
                <div></div>
              ) : (
                <div className="wind-str">Ветер: {data.current.wind_kph}km</div>
              )}
            </div>
          )}
          {isActive && (
            <div>
              {isLoading ? (
                <div></div>
              ) : (
                <div>Давление: {data.current.pressure_mb}Н/м²</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;

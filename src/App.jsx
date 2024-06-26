import { useState } from 'react'

import './App.css'
/*images*/
import searchIcon from "./assets/search.png";
import clearIcon from  "./assets/clear.jpg";
import cloudIcon from "./assets/cloud.png";
import drizzleIcon from "./assets/drizzle.jpg";
import rainIcon from "./assets/rain.png";
import windIcon from "./assets/wind.jpg";
import snowIcon from "./assets/snow.png";
import humidityIcon from "./assets/humidity.jpg";


const WeatherDetails = ({icon,temp,city,country,lat,log,humidity,wind}) => {
  return(
    <>
    <div className='image'>
      <img src={icon} alt="image" />
    </div>
    <div className='temp'>{temp}°C</div>
    <div className='location'>{city}</div>
    <div className='country'>{country}</div>
    <div className='cord'>
     
        <span className='lat'>latitude</span>
        <span>{lat}</span>
        <span className='log'>longitude</span>
        <span>{log}</span>
      </div>
      <div>
    </div>
    <div className='data-container'>
      <div className='element'>
        <img src={humidityIcon} alt="humidity" className='icon' />

        <div className='data'>
          <div className='humidity-percent'>{humidity}%</div>
          <div className='text' >Humidity</div>
        </div>

        <div className='element'>
        <img src={windIcon} alt="wind" className='icon' />

        <div className='data'>
          <div className='wind-percent'>{wind} km/h</div></div>
          <div className='text' >Wind speed</div>
        </div>
      </div>
    </div>

    </>
  );
};



function App() {
  const [text, setText] =useState("chennai")
  const [icon, setIcon] = useState(snowIcon)
  const [temp, setTemp] = useState("0");
  const [city, setCity] = useState("chennai");
  const [country, setCountry] = useState("IN");
  const [lat, setLat] = useState('0');
  const [log, setLog] = useState('0');
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0)
  const [cityNotFound, setCityNotFound] = useState (false);
  const[loading, setLoading] = useState(false);


  const weatherIconMap = {
    "01d" : clearIcon,
    "01n" : clearIcon,
    "02d" : cloudIcon,
    "02n" : cloudIcon,
    "03d" : drizzleIcon,
    "03n" : drizzleIcon,
    "04d" : drizzleIcon,
    "04n" : drizzleIcon,
    "09d" : rainIcon,
    "10d" : rainIcon,
    "10n" : rainIcon,
    "13d" : snowIcon,
    "13n" : snowIcon,
  };

  const search = async () => {
    setLoading(true);
    let api_key = "4159194e8ea7ec83fd0259f4033437a2"
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;
  
  try{
   let res = await fetch(url);
   let data = await res.json();
   //console.log(data);
   if(data.cod === "404"){
    console.error("City not found");
    setCityNotFound(true);
    setLoading(false);
    return;
   }
   
   setHumidity(data.main.humidity);
   setWind(data.wind.speed);
   setTemp(Math.floor(data.main.temp));
   setCity(data.name);
   setCountry(data.sys.country);
   setLat(data.coord.lat);
   setLog(data.coord.lon);
   const weatherIconCode = data.weather[0].icon;
   setIcon(weatherIconMap[weatherIconCode] || clearIcon);
   setCityNotFound(false);

  }catch(error){
   console.error("An error occurred", error.message);
  }finally{
    setLoading(false);
  }

 };
  const handleCity = (e) => {
    setText(e.target.value);

  };

  const handleKeyDown = (e) =>{
    if(e.key === "Enter"){
      search();
    }
  }
  return (
    <>
      <div className='container'>
        <div className='input-container'>
          <input type="text"
          className='cityInput'
          placeholder='Search City' onChange={handleCity} value={text} onKeyDown={handleKeyDown}/>
           
          <div className='search-icon' onClick={() => search()}>
            <img src={searchIcon} alt="Search" />
          </div>

          </div>
        <WeatherDetails icon={icon} temp={temp} city={city}
        country={country} lat={lat} log={log}
        humidity={humidity} wind={wind}/>
        </div>

        
    </>
  )
}
export default App

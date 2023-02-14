import { useState } from "react";
import "./Weather.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faWind } from "@fortawesome/free-solid-svg-icons";
import { faWater } from "@fortawesome/free-solid-svg-icons";

const API_KEY = "d3665c71148b76eb68c051a2b7d8a316";

const Weather = () => {
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState(0);
  const [desc, setDesc] = useState("");
  const [hum, setHum] = useState(0);
  const [wind, setWind] = useState(0);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [hidesearch, setHidesearch] = useState(false);

  const getWeather = async (e) => {
    e.preventDefault();

    try {
      const weather = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      const weatherObj = await weather.json();
      setTemp(Math.round(weatherObj.main.temp));
      setDesc(weatherObj.weather[0].description);
      setHum(Math.round(weatherObj.main.humidity));
      setWind(Math.round(weatherObj.wind.speed));
      selectImg(weatherObj.weather[0].main);
      setHidesearch(true);
      setLoading(true);
    } catch (err) {
      console.log("City Not Found");
      alert("ERR: Enter Valid Country");
    }
  };

  function selectImg(sky) {
    switch (sky) {
      case "Clear":
        setImage(
          "https://raw.githubusercontent.com/AsmrProg-YT/100-days-of-javascript/master/Day%20%2310%20-%20Weather%20App/images/clear.png"
        );
        break;
      case "Rain":
        setImage(
          "https://raw.githubusercontent.com/AsmrProg-YT/100-days-of-javascript/master/Day%20%2310%20-%20Weather%20App/images/rain.png"
        );
        break;
      case "Snow":
        setImage(
          "https://raw.githubusercontent.com/AsmrProg-YT/100-days-of-javascript/master/Day%20%2310%20-%20Weather%20App/images/mist.png"
        );
        break;
      case "Clouds":
        setImage(
          "https://raw.githubusercontent.com/AsmrProg-YT/100-days-of-javascript/master/Day%20%2310%20-%20Weather%20App/images/cloud.png"
        );
        break;
      case "Haze":
        setImage(
          "https://raw.githubusercontent.com/AsmrProg-YT/100-days-of-javascript/master/Day%20%2310%20-%20Weather%20App/images/snow.png"
        );
        break;
      default:
        setImage(
          "https://raw.githubusercontent.com/AsmrProg-YT/100-days-of-javascript/master/Day%20%2310%20-%20Weather%20App/images/404.png"
        );
        break;
    }
  }

  return (
    <>
      {!hidesearch ? (
        <div className="search">
          <form onSubmit={(e) => getWeather(e)}>
            <FontAwesomeIcon className="mm" icon={faMapLocationDot} />
            <input
              className="city_input"
              value={city}
              placeholder="Location"
              onChange={(e) => setCity(e.target.value)}
            />
            <FontAwesomeIcon className="si" icon={faSearch} />
          </form>
        </div>
      ) : null}
      {loading ? (
        <>
          <div className="result">
            <h2 className="title">{city}</h2>
            <img className="sky_img" src={image} alt="test" />

            <div className="main_comp">
              <h3 className="temp">{temp} °C</h3>
              <h3 className="sky">{desc}</h3>
            </div>

            <div className="footer">
              <div className="humidity">
                <FontAwesomeIcon icon={faWater} className="hd" />
                <div className="hum_comp">
                  <p>{hum} %</p>
                  <p>Humidity</p>
                </div>
              </div>

              <div className="wind">
                <FontAwesomeIcon icon={faWind} className="wd" />
                <div className="wind_comp">
                  <p>{wind} kmph</p>
                  <p>Wind Speed</p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Weather;

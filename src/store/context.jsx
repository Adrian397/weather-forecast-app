import axios from "axios";
import { createContext, useEffect, useState, useRef } from "react";
import moment from "moment-timezone";

const Context = createContext({
  weather: {},
  place: {},
  wind: {},
  location: "",
  transformedTime: "",
  transformedPlace: "",
  transformedDay: "",
  forecast: [],
  setDailyWeatherForecast: () => {},
  submitLocation: () => {},
});

export const ContextProvider = ({ children }) => {
  const [weather, setWeather] = useState({});
  const [place, setPlace] = useState("");
  const [wind, setWind] = useState({});
  const [location, setLocation] = useState("Łódź");
  const [timezone, setTimezone] = useState([]);
  const [forecast, setForecast] = useState([]);

  const inputLocation = useRef("");

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        const getWeather = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=6dc61734832dac8d077946c3e8d901af&units=metric`
        );

        const getForecast = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=6dc61734832dac8d077946c3e8d901af&units=metric`
        );

        // cutting list of data from 40 objs to 5 objs
        let fiveDaysForecast = [];

        for (let i = 0; i < getForecast.data.list.length; i += 8) {
          fiveDaysForecast.push(getForecast.data.list[i]);
        }

        setForecast(fiveDaysForecast);

        console.log(getWeather);

        const currentWeather = getWeather.data.main;
        const currentPlace = getWeather.data.name;
        const currentWind = getWeather.data.wind;
        const currentTime = getWeather.data.timezone;

        setWeather(currentWeather);
        setPlace(currentPlace);
        setWind(currentWind);
        setTimezone(currentTime);
      } catch (err) {
        console.log(err);
      }
    };

    getWeatherData();
  }, [location]);

  if (forecast.length > 0) {
    console.log(forecast);
  }

  console.log(weather);
  console.log(wind);

  // console.log(weather);
  // console.log(place);
  console.log(location);

  // time conversion using moment.js
  const timezoneInMinutes = timezone / 60;
  const transformedTime = moment()
    .utcOffset(timezoneInMinutes)
    .format("h:mm A");

  const transformedData = moment()
    .utcOffset(timezoneInMinutes)
    .format("YYYY-MM-DD");

  const transformedDay = moment(transformedData).format("dddd");

  // wind degrees conversion
  let compassSector = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
    "N",
  ];

  const windDirection = compassSector[(wind.deg / 22.5).toFixed(0)];
  console.log(windDirection);

  // wind speed conversion
  const windSpeed = ((wind.speed * (60 * 60)) / 1000).toFixed(0);
  console.log(windSpeed);

  // daily weather forecast
  const setDailyWeatherForecast = (n) => {
    if (forecast.length > 0) {
      return Math.trunc(forecast[n].main.temp_max);
    }
  };

  // location finder
  const submitLocation = (e) => {
    e.preventDefault();
    setLocation(inputLocation.current.value);
  };

  const context = {
    weather,
    place,
    inputLocation,
    wind,
    windDirection,
    windSpeed,
    transformedTime,
    transformedDay,
    forecast,
    submitLocation,
    setDailyWeatherForecast,
  };
  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export default Context;

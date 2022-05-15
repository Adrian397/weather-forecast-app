import axios from "axios";
import { createContext, useEffect, useState, useRef } from "react";
import moment from "moment-timezone";

const Context = createContext({
  weather: {},
  place: {},
  wind: {},
  location: "",
  convertedTime: "",
  transformedPlace: "",
  convertedDay: "",
  forecast: [],
  isLoading: true,
  historicTemp: [],
  lastFiveDays: [],
  setDailyTemperature: () => {},
  setNextDays: () => {},
  submitLocation: () => {},
  setWeatherIcon: () => {},
});

export const ContextProvider = ({ children }) => {
  const [weather, setWeather] = useState({});
  const [place, setPlace] = useState("");
  const [wind, setWind] = useState({});
  const [location, setLocation] = useState("Łódź");
  const [timezone, setTimezone] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lat, setLat] = useState(51.7687);
  const [lon, setLon] = useState(19.457);
  const [historicTemp, setHistoricTemp] = useState([]);

  const inputLocation = useRef("");

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        ////////////////////////////////////////////////////
        // getting current data for displayed location    //
        ////////////////////////////////////////////////////
        const getWeather = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=&units=metric`
        );

        const currentWeather = getWeather.data.main;
        const currentPlace = getWeather.data.name;
        const currentWind = getWeather.data.wind;
        const currentTime = getWeather.data.timezone;

        setWeather(currentWeather);
        setPlace(currentPlace);
        setWind(currentWind);
        setTimezone(currentTime);

        ////////////////////////////////////////////////////////////////////////////////
        // getting 5 days, (every 3 hours updating) data ahead for displayed location //
        ////////////////////////////////////////////////////////////////////////////////
        const getForecast = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=&units=metric`
        );

        // cutting list of data from 40 objs to 5 objs
        let fiveDaysForecast = [];

        // this forecast updates every 3 hours so if last update was at e.g. 3 PM, the "next day" div will be displayed with next day's temp at 3 PM. Its because whenever forecast updates, last update lands at [0] index of an array.
        for (let i = 0; i < getForecast.data.list.length; i += 8) {
          fiveDaysForecast.push(getForecast.data.list[i]);
        }

        // console.log(fiveDaysForecast);

        setForecast(fiveDaysForecast);

        //////////////////////////////////////////////////////////////////////////////
        // getting historic 5 days ago data for displayed location                  //
        // historic data must be called with one by one api call as a requirement   //
        //////////////////////////////////////////////////////////////////////////////

        // conversion from location to coordinates
        const getCoordinatesByLocation = await axios.get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=
          `
        );

        const getLat = getCoordinatesByLocation.data[0].lat;
        setLat(getLat);

        const getLon = getCoordinatesByLocation.data[0].lon;
        setLon(getLon);

        // each previous day converted to UTC
        const lastDay = moment().subtract(1, "days");
        const lastDayToUnix = moment(lastDay).unix();

        const twoDaysAgo = moment().subtract(2, "days");
        const twoDaysAgoToUnix = moment(twoDaysAgo).unix();

        const threeDaysAgo = moment().subtract(3, "days");
        const threeDaysAgoToUnix = moment(threeDaysAgo).unix();

        const fourDaysAgo = moment().subtract(4, "days");
        const fourDaysAgoToUnix = moment(fourDaysAgo).unix();

        const fiveDaysAgo = moment().subtract(5, "days");
        const fiveDaysAgoToUnix = moment(fiveDaysAgo).unix();

        // console.log(twoDaysAgo);
        // console.log(twoDaysAgoToUnix);

        const getLastDayTemp = await axios.get(
          `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${lastDayToUnix}&appid=&units=metric`
        );

        const get2DaysAgoTemp = await axios.get(
          `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${twoDaysAgoToUnix}&appid=&units=metric`
        );

        const get3DaysAgoTemp = await axios.get(
          `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${threeDaysAgoToUnix}&appid=&units=metric`
        );

        const get4DaysAgoTemp = await axios.get(
          `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${fourDaysAgoToUnix}&appid=&units=metric`
        );

        const get5DaysAgoTemp = await axios.get(
          `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${fiveDaysAgoToUnix}&appid=&units=metric`
        );

        const getLastFiveDaysTemp = [];
        getLastFiveDaysTemp.push(
          get5DaysAgoTemp.data.current.temp,
          get4DaysAgoTemp.data.current.temp,
          get3DaysAgoTemp.data.current.temp,
          get2DaysAgoTemp.data.current.temp,
          getLastDayTemp.data.current.temp
        );

        setHistoricTemp(getLastFiveDaysTemp);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };

    getWeatherData();
  }, [location, lat, lon]);

  // if (historicTemp.length > 0) {
  //   console.log(historicTemp);
  // }

  // time conversion using moment.js
  const timezoneInMinutes = timezone / 60;
  const convertedTime = moment().utcOffset(timezoneInMinutes).format("h:mm A");

  const convertedDate = moment()
    .utcOffset(timezoneInMinutes)
    .format("YYYY-MM-DD");

  const convertedDay = moment(convertedDate).format("dddd");

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

  let windDirection;
  if (Object.keys(wind).length) {
    windDirection = compassSector[(wind.deg / 22.5).toFixed(0)];
    // console.log(windDirection);
  }

  // wind speed conversion
  let windSpeed;
  if (Object.keys(wind).length) {
    windSpeed = ((wind.speed * (60 * 60)) / 1000).toFixed(0);
    // console.log(windSpeed);
  }

  // daily weather forecast
  const setDailyTemperature = (n) => {
    if (forecast.length > 0) {
      return Math.trunc(forecast[n].main.temp_max);
    }
  };

  // if (forecast.length > 0) {
  //   console.log(forecast);
  // }

  // setting next days
  const setNextDays = (n) => {
    if (forecast.length > 0) {
      const convertedDate = forecast[n].dt_txt.slice(0, 10);
      return moment(convertedDate).format("dddd");
    }
  };

  // setting weather icon that depends on the weather
  const setWeatherIcon = (n) => {
    if (forecast.length > 0) {
      if (forecast[n].weather[0].main === "Rain") {
        return "rain";
      } else if (forecast[n].weather[0].main === "Clear") {
        return "sun";
      } else if (forecast[n].weather[0].main === "Clouds") {
        return "clouds";
      }
    }
  };

  // location finder
  const submitLocation = (e) => {
    e.preventDefault();
    setLocation(inputLocation.current.value);
  };

  const lastDay = moment().subtract(1, "days").format("DD-MM-YYYY");
  const twoDaysAgo = moment().subtract(2, "days").format("DD-MM-YYYY");
  const threeDaysAgo = moment().subtract(3, "days").format("DD-MM-YYYY");
  const fourDaysAgo = moment().subtract(4, "days").format("DD-MM-YYYY");
  const fiveDaysAgo = moment().subtract(4, "days").format("DD-MM-YYYY");

  const lastFiveDays = [];
  lastFiveDays.push(
    fiveDaysAgo,
    fourDaysAgo,
    threeDaysAgo,
    twoDaysAgo,
    lastDay
  );

  const context = {
    weather,
    place,
    inputLocation,
    wind,
    windDirection,
    windSpeed,
    convertedTime,
    convertedDay,
    forecast,
    isLoading,
    historicTemp,
    lastFiveDays,
    submitLocation,
    setDailyTemperature,
    setNextDays,
    setWeatherIcon,
  };
  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export default Context;

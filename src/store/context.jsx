import { createContext, useEffect, useState, useRef } from "react";
import moment from "moment-timezone";
import { apiService } from "../services/api/api.service";

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
        const getWeather = await apiService.getWeather(location);

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
        const getForecast = await apiService.getForecast(location);

        // cutting list of data from 40 objs to 5 objs
        let fiveDaysForecast = [];

        // this forecast updates every 3 hours so if last update was at e.g. 3 PM, the "next day" div will be displayed with next day's temp at 3 PM. Its because whenever forecast updates, last update lands at [0] index of an array.
        for (let i = 0; i < getForecast.data.list.length; i += 8) {
          fiveDaysForecast.push(getForecast.data.list[i]);
        }

        setForecast(fiveDaysForecast);

        ////////////////////////////////////////////////////////////////////////////////////
        // getting historic 5 days ago data for displayed location                        //
        // historic data must be called with one by one api call as an api's requirement  //
        ////////////////////////////////////////////////////////////////////////////////////

        // getting coordinates to use it with historic api
        const getLat = getWeather.data.coord.lat;
        setLat(getLat);

        const getLon = getWeather.data.coord.lon;
        setLon(getLon);

        const getDayTempByDate = (dayValue) => {
          const day = moment().subtract(dayValue, "days");
          const dayToUnix = moment(day).unix();
          return apiService.getTemp({ lat, lon }, dayToUnix);
        };

        const [
          getLastDayTemp,
          get2DaysAgoTemp,
          get3DaysAgoTemp,
          get4DaysAgoTemp,
          get5DaysAgoTemp,
        ] = await Promise.all([
          getDayTempByDate(1),
          getDayTempByDate(2),
          getDayTempByDate(3),
          getDayTempByDate(4),
          getDayTempByDate(5),
        ]);

        const getLastFiveDaysTemp = [
          get5DaysAgoTemp.data.current.temp,
          get4DaysAgoTemp.data.current.temp,
          get3DaysAgoTemp.data.current.temp,
          get2DaysAgoTemp.data.current.temp,
          getLastDayTemp.data.current.temp,
        ];

        setHistoricTemp(getLastFiveDaysTemp);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };

    getWeatherData();
  }, [location]);

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
  }

  // wind speed conversion
  let windSpeed;
  if (Object.keys(wind).length) {
    windSpeed = ((wind.speed * (60 * 60)) / 1000).toFixed(0);
  }

  // daily weather forecast
  const setDailyTemperature = (n) => {
    if (forecast.length > 0) {
      return Math.trunc(forecast[n].main.temp_max);
    }
  };

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

  // last days chart display
  const lastDays = (day) => {
    return moment().subtract(day, "days").format("DD-MM-YYYY");
  };

  const lastFiveDays = [
    lastDays(5),
    lastDays(4),
    lastDays(3),
    lastDays(2),
    lastDays(1),
  ];
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

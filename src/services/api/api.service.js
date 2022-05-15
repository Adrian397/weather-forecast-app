import axios from "axios";

const api = () => {
  const appid = process.env.REACT_APP_API_KEY;
  const baseUrl = "https://api.openweathermap.org/data/2.5";

  return {
    getForecast: (location) =>
      axios.get(
        `${baseUrl}/forecast?q=${location}&appid=${appid}&units=metric`
      ),
    getWeather: (location) =>
      axios.get(`${baseUrl}/weather?q=${location}&appid=${appid}&units=metric`),

    getTemp: ({ lat, lon }, dateInUnix) =>
      axios.get(
        `${baseUrl}/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${dateInUnix}&appid=${appid}&units=metric`
      ),
  };
};

export const apiService = api();

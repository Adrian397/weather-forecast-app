import axios from "axios";
import { createContext, useEffect, useState, useRef } from "react";

const Context = createContext({
  weather: {},
  place: {},
  location: "",
  setLocation: () => {},
});

export const ContextProvider = ({ children }) => {
  const [weather, setWeather] = useState({});
  const [place, setPlace] = useState({});
  // const [location, setLocation] = useState("");
  const location = useRef("Warsaw");

  useEffect(() => {
    location.current.value = "Warsaw";

    const getWeatherData = async () => {
      try {
        const request = await axios.get(
          `http://api.weatherstack.com/current?access_key=&query=${location.current.value}`
        );

        const currentWeather = request.data.current;
        const currentPlace = request.data.location;

        setWeather(currentWeather);
        setPlace(currentPlace);
      } catch (err) {
        console.log(err);
      }
    };

    getWeatherData();
  }, []);

  console.log(weather);
  console.log(place);
  console.log(location.current.value);

  const setLocation = (e) => {
    return location.current.value;
  };

  const context = {
    weather,
    place,
    location,
    setLocation,
  };
  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export default Context;

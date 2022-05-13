import axios from "axios";
import { createContext, useEffect, useState, useRef } from "react";

const Context = createContext({
  weather: {},
  place: {},
  location: "",
  submitLocation: () => {},
});

export const ContextProvider = ({ children }) => {
  const [weather, setWeather] = useState({});
  const [place, setPlace] = useState({});
  const [location, setLocation] = useState("Warsaw");
  const inputLocation = useRef("");

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        const request = await axios.get(
          `http://api.weatherstack.com/current?access_key=21b2fa9daa08b5e8059691abb139c1db&query=${location}`
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
  }, [location]);

  // console.log(weather);
  // console.log(place);
  console.log(location);

  const submitLocation = (e) => {
    e.preventDefault();
    setLocation(inputLocation.current.value);
  };

  const context = {
    weather,
    place,
    inputLocation,
    submitLocation,
  };
  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export default Context;

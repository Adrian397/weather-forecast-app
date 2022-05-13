import styled from "styled-components";
import IconWind from "../icons/icon-wind";
import IconWindDirection from "../icons/icon-wind-direction";
import IconHumidity from "../icons/icon-humidity";
import IconAtmospherePressure from "../icons/icon-atmosphere-pressure";
import { useContext } from "react";
import Context from "../../store/context";

const WeatherDisplay = () => {
  const current = useContext(Context);

  let currentDay;
  // let currentTime;

  currentDay = new Date(current.place.localtime).toLocaleString("en-us", {
    weekday: "long",
  });

  // currentTime = current.place.localtime.slice(10);

  return (
    <Wrapper>
      <div>
        <PrimaryInfo>
          <h1>{current.place.name},</h1>
          <h2>{current.weather.temperature}°</h2>
          <p>{currentDay},</p>
        </PrimaryInfo>
        <AdditionalInfo>
          <p>
            <IconWind /> Wind Speed: {current.weather.wind_speed}
          </p>
          <p>
            <IconWindDirection /> Wind Direction: {current.weather.wind_dir}
          </p>
          <p>
            <IconAtmospherePressure />
            Atmospheric pressure: {current.weather.pressure}
          </p>
          <p>
            <IconHumidity />
            Humidity: {current.weather.humidity}
          </p>
        </AdditionalInfo>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 50%;
  border-radius: 10px 0 0 10px;

  & > div {
    height: 100%;
    padding-left: 4rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
`;

const PrimaryInfo = styled.section`
  margin-bottom: 10rem;
  h1 {
    font-size: 5rem;
  }

  h2 {
    font-size: 4rem;
    margin: 1rem 0rem;
  }

  p {
    font-size: 2.4rem;
  }
`;

const AdditionalInfo = styled.div`
  p {
    margin: 1rem 0rem;
    font-size: 1.2rem;

    display: flex;
    align-items: center;
  }
`;
export default WeatherDisplay;

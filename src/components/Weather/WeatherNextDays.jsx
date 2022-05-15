import styled from "styled-components";
import IconSun from "../icons/icon-sun";
import IconCloud from "../icons/icon-cloud";
import IconRain from "../icons/icon-rain";

import { useContext } from "react";
import Context from "../../store/context";

const WeatherNextDays = () => {
  const ctx = useContext(Context);
  return (
    <Container>
      <div>
        {ctx.setWeatherIcon(0) === "clouds" && <IconCloud />}
        {ctx.setWeatherIcon(0) === "sun" && <IconSun />}
        {ctx.setWeatherIcon(0) === "rain" && <IconRain />}
        <h3>{ctx.setDailyTemperature(0)}°</h3>
        <p>Today</p>
      </div>
      <div>
        {ctx.setWeatherIcon(1) === "clouds" && <IconCloud />}
        {ctx.setWeatherIcon(1) === "sun" && <IconSun />}
        {ctx.setWeatherIcon(1) === "rain" && <IconRain />}
        <h3>{ctx.setDailyTemperature(1)}°</h3>
        <p>{ctx.setNextDays(1)}</p>
      </div>
      <div>
        {ctx.setWeatherIcon(2) === "clouds" && <IconCloud />}
        {ctx.setWeatherIcon(2) === "sun" && <IconSun />}
        {ctx.setWeatherIcon(2) === "rain" && <IconRain />}
        <h3>{ctx.setDailyTemperature(2)}°</h3>
        <p>{ctx.setNextDays(2)}</p>
      </div>
      <div>
        {ctx.setWeatherIcon(3) === "clouds" && <IconCloud />}
        {ctx.setWeatherIcon(3) === "sun" && <IconSun />}
        {ctx.setWeatherIcon(3) === "rain" && <IconRain />}
        <h3>{ctx.setDailyTemperature(3)}°</h3>
        <p>{ctx.setNextDays(3)}</p>
      </div>
      <div>
        {ctx.setWeatherIcon(4) === "clouds" && <IconCloud />}
        {ctx.setWeatherIcon(4) === "sun" && <IconSun />}
        {ctx.setWeatherIcon(4) === "rain" && <IconRain />}
        <h3>{ctx.setDailyTemperature(4)}°</h3>
        <p>{ctx.setNextDays(4)}</p>
      </div>
    </Container>
  );
};

const Container = styled.section`
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  & > div {
    width: 5rem;
    height: 8rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    border-radius: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    background: linear-gradient(
      to right bottom,
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0.3)
    );
  }

  & > div p {
    font-size: 0.8rem;
  }
`;

export default WeatherNextDays;

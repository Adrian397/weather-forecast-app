import styled from "styled-components";
import IconSun from "../icons/icon-sun";
import IconCloud from "../icons/icon-cloud";
import IconRain from "../icons/icon-rain";
import IconSnow from "../icons/icon-snow";
import { useContext } from "react";
import Context from "../../store/context";

const WeatherNextDays = () => {
  const ctx = useContext(Context);

  return (
    <Container>
      <div>
        <IconSun />
        <h3>{ctx.setDailyWeatherForecast(0)}°</h3>
        <p></p>
      </div>
      <div>
        <IconCloud />
        <h3>{ctx.setDailyWeatherForecast(1)}°</h3>
        <p>nextDay</p>
      </div>
      <div>
        <IconRain />
        <h3>{ctx.setDailyWeatherForecast(2)}°</h3>
        <p>nextDay</p>
      </div>
      <div>
        <IconSnow />
        <h3>{ctx.setDailyWeatherForecast(3)}°</h3>
        <p>nextDay</p>
      </div>
      <div>
        <IconSun />
        <h3>{ctx.setDailyWeatherForecast(4)}°</h3>
        <p>nextDay</p>
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
`;

export default WeatherNextDays;

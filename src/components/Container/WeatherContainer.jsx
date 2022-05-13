import styled from "styled-components";
import WeatherDisplay from "../Weather/WeatherDisplay";
import WeatherChart from "../Weather/WeatherChart";
import LocationInput from "../Location/LocationInput";

const WeatherContainer = () => {
  return (
    <Wrapper>
      <LocationInput />
      <WeatherDisplay />
      <WeatherChart />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 90rem;
  height: 50rem;
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.7),
    rgba(255, 255, 255, 0.3)
  );
  border-radius: 10px;
  display: flex;
  position: relative;
`;

export default WeatherContainer;

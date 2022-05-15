import styled from "styled-components";
import WeatherDisplay from "../Weather/WeatherDisplay";
import WeatherChart from "../Weather/WeatherChart";
import LocationInput from "../Location/LocationInput";
import WeatherNextDays from "../Weather/WeatherNextDays";
import Context from "../../store/context";
import LoadingSpinner from "../UI/LoadingSpinner";
import { useContext } from "react";

const WeatherContainer = () => {
  const ctx = useContext(Context);
  return (
    <Wrapper>
      {ctx.isLoading && <LoadingSpinner>Loading...</LoadingSpinner>}
      {!ctx.isLoading && (
        <>
          <LocationInput />
          <WeatherDisplay />
          <Informations>
            <WeatherChart />
            <WeatherNextDays />
          </Informations>
        </>
      )}
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

const Informations = styled.div`
  width: 50%;
`;

// const Spinner = styled.div`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   width: 10rem;
//   height: 10rem;
//   background: yellow;
// `;

export default WeatherContainer;

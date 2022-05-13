import styled from "styled-components";
import IconSun from "../icons/icon-sun";
import IconCloud from "../icons/icon-cloud";
import IconRain from "../icons/icon-rain";
import IconSnow from "../icons/icon-snow";

const WeatherNextDays = () => {
  return (
    <Container>
      <div>
        <IconSun />
        <h3>27°</h3>
        <p>Today</p>
      </div>
      <div>
        <IconCloud />
        <h3>23°</h3>
        <p>Tue</p>
      </div>
      <div>
        <IconRain />
        <h3>18°</h3>
        <p>Wen</p>
      </div>
      <div>
        <IconSnow />
        <h3>19°</h3>
        <p>Thurs</p>
      </div>
      <div>
        <IconSun />
        <h3>23°</h3>
        <p>Frid</p>
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

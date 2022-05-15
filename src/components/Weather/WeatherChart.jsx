import React from "react";
import styled from "styled-components";
import Context from "../../store/context";
import { useContext } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const WeatherChart = () => {
  const ctx = useContext(Context);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Historic Chart",
      },
    },
  };
  const labels = ctx.lastFiveDays;

  const data = {
    labels,
    datasets: [
      {
        label: "Temperature",
        data: ctx.historicTemp,
        borderColor: "orange",
        backgroundColor: "rgba(253, 153, 38, 0.5)",
      },
    ],
  };

  return (
    <Container>
      <Line options={options} data={data} />
    </Container>
  );
};

const Container = styled.section`
  padding: 3rem 2.5rem 0rem 2rem;
  height: 50%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default WeatherChart;

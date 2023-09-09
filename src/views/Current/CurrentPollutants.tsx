import { Chart as ChartJS, CategoryScale, LinearScale, LogarithmicScale, LogarithmicScaleOptions, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { airQualityStandards } from "../../App";
import { Pollutants } from "../../types";

interface CurrentPollutantsProps {
  pollutants: Pollutants;
}

ChartJS.register(CategoryScale, LinearScale, LogarithmicScale, BarElement, Title, Tooltip, Legend);

const CurrentPollutants = (props: CurrentPollutantsProps) => {
  console.log(props.pollutants);
  const data = {
    labels: Object.keys(props.pollutants),
    datasets: [
      {
        label: "Current pollutants",
        data: Object.values(props.pollutants),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const boundaryValues = Object.values(airQualityStandards);

  const options = {
    scales: {
      y: {
        display: true,
        type: "logarithmic",
        beginAtZero: true,
        min: 0,
        max: 10000,
        ticks: {
          // callback: (value: any, index: number) => {
          //   const boundaryValue = boundaryValues[index];
          //   if (value === boundaryValue) {
          //     return {
          //       content: boundaryValue,
          //       fontStyle: "bold",
          //     };
          //   }
          //   return value;
          // },
        },
      },
    },
  };

  return (
    <>
      <Bar data={data} options={options} />
      <ul>
        <li>
          CO: {props.pollutants.co} µg/m3, standard: {airQualityStandards.co} µg/m3
        </li>
        <li>
          NO2: {props.pollutants.no2} µg/m3, standard: {airQualityStandards.no2} µg/m3
        </li>
        <li>
          O3: {props.pollutants.o3} µg/m3, standard: {airQualityStandards.o3} µg/m3
        </li>
        <li>
          PM2.5: {props.pollutants.pm2_5} µg/m3, standard: {airQualityStandards.pm2_5} µg/m3
        </li>
        <li>
          PM10: {props.pollutants.pm10} µg/m3, standard: {airQualityStandards.pm10} µg/m3
        </li>
        <li>
          SO2: {props.pollutants.so2} µg/m3, standard: {airQualityStandards.so2} µg/m3
        </li>
      </ul>
    </>
  );
};

export default CurrentPollutants;

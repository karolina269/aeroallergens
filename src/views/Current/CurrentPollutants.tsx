// @ts-nocheck
import { Chart as ChartJS, CategoryScale, LinearScale, LogarithmicScale, LogarithmicScaleOptions, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar, Chart } from "react-chartjs-2";
import { airQualityStandards } from "../../App";
import { Pollutants } from "../../types";

interface CurrentPollutantsProps {
  pollutants: Pollutants;
}

ChartJS.register(CategoryScale, LinearScale, LogarithmicScale, BarElement, Title, Tooltip, Legend);

const CurrentPollutants = (props: CurrentPollutantsProps) => {
  const data = {
    labels: Object.keys(props.pollutants),
    datasets: [
      {
        label: "Current pollutants",
        data: Object.values(props.pollutants),
        backgroundColor: "rgba(75, 192, 192, 1)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Safe level",
        data: Object.values(airQualityStandards),
        backgroundColor: "rgba(192, 192, 192, 0.5)",
        borderColor: "rgba(192, 192, 192, 0.5)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        stacked: true,
      },
      y: {
        display: true,
        type: "logarithmic",
        min: 0,
        max: 10000,
      },
    },
  };

  return (
    <section className="currentPollutants">
      <div className="currentPollutantsChart">
        <Chart type="bar" data={data} options={options} />
      </div>
      <ul>
        <li>
          CO: {props.pollutants.co} µg/m3, safe level: {airQualityStandards.co} µg/m3
        </li>
        <li>
          NO2: {props.pollutants.no2} µg/m3, safe level: {airQualityStandards.no2} µg/m3
        </li>
        <li>
          O3: {props.pollutants.o3} µg/m3, safe level: {airQualityStandards.o3} µg/m3
        </li>
        <li>
          PM2.5: {props.pollutants.pm2_5} µg/m3, safe level: {airQualityStandards.pm2_5} µg/m3
        </li>
        <li>
          PM10: {props.pollutants.pm10} µg/m3, safe level: {airQualityStandards.pm10} µg/m3
        </li>
        <li>
          SO2: {props.pollutants.so2} µg/m3, safe level: {airQualityStandards.so2} µg/m3
        </li>
      </ul>
    </section>
  );
};

export default CurrentPollutants;

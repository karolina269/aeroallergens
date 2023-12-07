// @ts-nocheck
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { airQualityStandards } from "../../App";
import { Pollutants } from "../../types";

interface CurrentPollutantsProps {
  pollutants: Pollutants;
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const CurrentPollutants = (props: CurrentPollutantsProps) => {
  const data = {
    labels: Object.keys(props.pollutants),
    datasets: [
      {
        label: "Current pollutants - percentage of the safe level",
        data: Object.values(props.pollutants).map((value, index) => Math.round((value / Object.values(airQualityStandards)[index]) * 100)),
        backgroundColor: function (context) {
          var value = context.dataset.data[context.dataIndex];
          return value > 100 ? "rgb(239,123,115)" : "rgb(107,214,140)";
        },
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    plugins: {
      datalabels: {
        anchor: "bottom", // Określa, gdzie powinna być umieszczona etykieta (end - na końcu słupka)
        align: "center", // Określa, jak etykieta ma być wyrównana względem słupka
        display: true,
        color: "black",
        font: {
          weight: "bold",
        },
        formatter: function (value) {
          return value + "%"; // Dodanie symbolu procenta do etykiety
        },
      },
    },
    scales: {
      x: {
        min: 0,
        max: 100,
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <section className="currentPollutants">
      <div className="currentPollutantsChart">
        <Bar data={data} options={options} />
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

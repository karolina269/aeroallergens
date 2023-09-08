import { Bar } from "react-chartjs-2";
import { airQualityStandards } from "../../App";
import { Pollutants } from "../../types";

interface CurrentPollutantsProps {
  pollutants: Pollutants;
}

const CurrentPollutants = (props: CurrentPollutantsProps) => {
  //
  return (
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
  );
};

export default CurrentPollutants;

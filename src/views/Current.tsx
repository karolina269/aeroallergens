import { useEffect, useState } from "react";
import { Position, PollutionData, AirQualityIndex } from "../types";
import axios from "axios";
import { Chart } from "chart.js";
import { apiKey } from "../config";
import { airQualityStandards } from "../App";

interface CurrentPollutionProps {
  currentPosition: Position;
}

const Current = (props: CurrentPollutionProps) => {
  const [currentPollution, setCurrentPollution] = useState<PollutionData>({
    aqi: 1,
    dt: "",
    components: {
      co: 0,
      no2: 0,
      o3: 0,
      pm2_5: 0,
      pm10: 0,
      so2: 0,
    },
  });

  useEffect(() => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/air_pollution?lat=${props.currentPosition.lat}&lon=${props.currentPosition.lng}&appid=${apiKey}`
      )
      .then((res) => {
        console.log(res.data);
        const date = new Date(res.data.list[0].dt * 1000).toUTCString();
        setCurrentPollution({ aqi: res.data.list[0].main.aqi, dt: date, components: res.data.list[0].components });
      })
      .catch((error) => console.log(error));
  }, [props]);

  return (
    <section className="currentPollution">
      <h2>Current</h2>
      <h3>Date: {currentPollution.dt}</h3>
      <h3>Air Quality: {AirQualityIndex[currentPollution.aqi]}</h3>
      <ul>
        <li>
          CO: {currentPollution.components.co} µg/m3, standard: {airQualityStandards.co} µg/m3
        </li>
        <li>
          NO2: {currentPollution.components.no2} µg/m3, standard: {airQualityStandards.no2} µg/m3
        </li>
        <li>
          O3: {currentPollution.components.o3} µg/m3, standard: {airQualityStandards.o3} µg/m3
        </li>
        <li>
          PM2.5: {currentPollution.components.pm2_5} µg/m3, standard: {airQualityStandards.pm2_5} µg/m3
        </li>
        <li>
          PM10: {currentPollution.components.pm10} µg/m3, standard: {airQualityStandards.pm10} µg/m3
        </li>
        <li>
          SO2: {currentPollution.components.so2} µg/m3, standard: {airQualityStandards.so2} µg/m3
        </li>
      </ul>
    </section>
  );
};

export default Current;

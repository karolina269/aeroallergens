import { useEffect, useState } from "react";
import { Position, PollutionData } from "../../types";
import axios from "axios";
import { apiKey } from "../../config";
import "./Current.css";
import CurrentPollutants from "./CurrentPollutants";
import CurrentAirQuality from "./CurrentAirQuality";

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
  const [dataReceived, setDataReceived] = useState<Boolean>(false);

  useEffect(() => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/air_pollution?lat=${props.currentPosition.lat}&lon=${props.currentPosition.lng}&appid=${apiKey}`
      )
      .then((res) => {
        const date = new Date(res.data.list[0].dt * 1000).toUTCString();
        setCurrentPollution({
          aqi: res.data.list[0].main.aqi,
          dt: date,
          components: {
            co: res.data.list[0].components.co,
            no2: res.data.list[0].components.no2,
            o3: res.data.list[0].components.o3,
            pm2_5: res.data.list[0].components.pm2_5,
            pm10: res.data.list[0].components.pm10,
            so2: res.data.list[0].components.so2,
          },
        });
        setDataReceived(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [props]);

  return (
    <section className="currentPollution">
      <h2>Current</h2>
      <h3>Date: {currentPollution.dt}</h3>
      <CurrentAirQuality aqi={currentPollution.aqi} dataReceived={dataReceived} />

      <CurrentPollutants pollutants={currentPollution.components} />
    </section>
  );
};

export default Current;

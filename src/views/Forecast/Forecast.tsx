import { useEffect, useState } from "react";
import { Position, PollutionData } from "../../types";
import axios from "axios";
import { apiKey } from "../../config";
import Select from "react-select";

interface ForecastProps {
  currentPosition: Position;
}

const Forecast = (props: ForecastProps) => {
  const [forecastPollution, setForecastPollution] = useState<PollutionData[]>([
    {
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
    },
  ]);
  const [dataReceived, setDataReceived] = useState<Boolean>(false);

  useEffect(() => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${props.currentPosition.lat}&lon=${props.currentPosition.lng}&appid=${apiKey}`
      )
      .then((res) => {
        const forecast = [];

        for (let i = 0; i < res.data.list.length; i++) {
          forecast.push({
            aqi: res.data.list[i].main.aqi,
            dt: new Date(res.data.list[i].dt * 1000).toUTCString(),
            components: {
              co: res.data.list[i].components.co,
              no2: res.data.list[i].components.no2,
              o3: res.data.list[i].components.o3,
              pm2_5: res.data.list[i].components.pm2_5,
              pm10: res.data.list[i].components.pm10,
              so2: res.data.list[i].components.so2,
            },
          });
        }
        setForecastPollution(forecast);
        setDataReceived(true);
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [props]);

  const selectOptions = [
    { value: "co", label: "co" },
    { value: "no2", label: "no2" },
    { value: "o3", label: "o3" },
    { value: "pm2_5", label: "pm2_5" },
    { value: "pm10", label: "pm10" },
    { value: "so2", label: "so2" },
  ];

  return (
    <section className="forecastPollution">
      <h2>Forecast</h2>
      <h3>
        Dates: from {forecastPollution[0].dt} to {forecastPollution[95].dt}
      </h3>
      <h4>Choose pollutant:</h4>
      <Select options={selectOptions} />

      {
        /* show forecast chart for selected pollutant - classic bar chart */
        /* prepare filtered data */
        //   <ForecastPollutantChart forecastPollutant={} />
      }
    </section>
  );
};

export default Forecast;

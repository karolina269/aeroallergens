import { useEffect, useState } from "react";
import { Position, PollutionData } from "../types";
import axios from "axios";
import { Chart } from "chart.js";

interface CurrentPollutionProps {
  currentPosition: Position;
}

const Current = (props: CurrentPollutionProps) => {
  const [currentPollution, setCurrentPollution] = useState<PollutionData>();

  useEffect(() => {
    axios
      .get("http://api.openweathermap.org/data/2.5/air_pollution?", {
        params: { lat: props.currentPosition.lat, lon: props.currentPosition.lng, appid: "f725f7a5541372fde5cdb7ba8617f97b" },

        headers: {
          "Access-Control-Allow-Origin": "*",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: false,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }, [props]);

  return (
    <section className="currentPollution">
      <h2>Current</h2>
    </section>
  );
};

export default Current;

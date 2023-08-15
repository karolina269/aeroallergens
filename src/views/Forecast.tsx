import { useEffect } from "react";
import { Position } from "../types";
import axios from "axios";

interface ForecastProps {
  currentPosition: Position;
}

const Forecast = (props: ForecastProps) => {
  // useEffect(() => {
  //   axios
  //     .get("https://api.ambeedata.com/forecast/pollen/by-lat-lng?", {
  //       params: { lat: props.currentPosition.lat, lng: props.currentPosition.lng },
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((error) => console.log(error));
  // }, [props]);

  return (
    <section>
      <h2>Forecast</h2>
    </section>
  );
};

export default Forecast;

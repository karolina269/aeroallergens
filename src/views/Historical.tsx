import { useEffect, useState } from "react";
import { Position } from "../types";
import axios from "axios";

interface HistoricalProps {
  currentPosition: Position;
}

const Historical = (props: HistoricalProps) => {
  const [startDate, setStartDate] = useState<string>(new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleString("sv", { timeZone: "UTC" }));
  const [endDate, setEndDate] = useState<string>(new Date(Date.now()).toLocaleString("sv", { timeZone: "UTC" }));

  // console.log(startDate);
  // console.log(props.currentPosition.lng, props.currentPosition.lat);

  // useEffect(() => {
  //   axios
  //     .get("https://api.ambeedata.com/history/pollen/by-lat-lng?", {
  //       params: { lat: props.currentPosition.lat, lng: props.currentPosition.lng, from: startDate, to: endDate },
  //     })

  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((error) => console.log(error));
  // }, [props]);

  return (
    <section>
      <h2>Historical</h2>
    </section>
  );
};

export default Historical;

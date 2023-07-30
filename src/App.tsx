import Geolocation from "./Geolocation";
import CurrentPollens from "./CurrentPollens";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

export interface Position {
  lat: number;
  lng: number;
}

const App = () => {
  const [currentPosition, setCurrentPosition] = useState<Position>({ lat: 0, lng: 0 });

  axios.defaults.headers.common = {
    "X-API-Key": "790943f855370562d5aa86c3155c3f5d410a64ec864198970b4cd3c0fae10457",
  };

  useEffect(() => {
    axios
      .get("https://api.ambeedata.com/latest/pollen/by-lat-lng?", { params: { lat: currentPosition.lat, lng: currentPosition.lng } })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="App">
      <Geolocation setCurrentPosition={setCurrentPosition} />
      <CurrentPollens currentPosition={currentPosition} />
    </div>
  );
};

export default App;

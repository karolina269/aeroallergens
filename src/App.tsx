import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import AppRoutes from "./routes/AppRoutes";
import AppNav from "./AppNav";
import { Position } from "./types";

const App = () => {
  const [currentPosition, setCurrentPosition] = useState<Position>({ lat: 0, lng: 0 });

  axios.defaults.headers.common = {
    apikey: "685f8ce4562c7576362c57db178be0da",
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentPosition({ lat: Math.round(position.coords.latitude * 100) / 100, lng: Math.round(position.coords.longitude * 100) / 100 });
    });
  }, []);

  return (
    <div className="App">
      <AppNav />
      <section className="position">
        <h3>position:</h3>
        <label htmlFor="lat">lat</label>
        <input
          id="lat"
          value={currentPosition.lat}
          min="-90"
          max="90"
          onChange={(e) => setCurrentPosition({ ...currentPosition, lat: Number(e.target.value) })}
        />
        <label htmlFor="lng">lng</label>
        <input
          id="lng"
          value={currentPosition.lng}
          min="-180"
          max="180"
          onChange={(e) => setCurrentPosition({ ...currentPosition, lng: Number(e.target.value) })}
        />
      </section>
      <AppRoutes currentPosition={currentPosition} />
    </div>
  );
};

export default App;

import "./App.css";
import { useState, useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import AppNav from "./AppNav";
import { Position, Pollutants } from "./types";

export const airQualityStandards: Pollutants = {
  co: 10,
  no2: 25,
  o3: 100,
  pm2_5: 15,
  pm10: 45,
  so2: 40,
};

const App = () => {
  const [currentPosition, setCurrentPosition] = useState<Position>({ lat: 0, lng: 0 });

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

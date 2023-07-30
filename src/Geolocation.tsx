import { useEffect } from "react";
import { Position } from "./App";

interface GeolocationProps {
  setCurrentPosition: (position: Position) => void;
}

const Geolocation = (props: GeolocationProps) => {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      props.setCurrentPosition({ lat: position.coords.latitude, lng: position.coords.longitude });
    });
  }, []);

  return <section className="geolocation">Geolocation component</section>;
};

export default Geolocation;

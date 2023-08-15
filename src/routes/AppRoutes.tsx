import { Route, Routes } from "react-router-dom";
import Historical from "../views/Historical";
import Forecast from "../views/Forecast";
import Current from "../views/Current";
import { Position } from "../types";

interface AppRoutesProps {
  currentPosition: Position;
}

const AppRoutes = (props: AppRoutesProps) => {
  return (
    <Routes>
      <Route path="/" element={<h2>home</h2>} />
      <Route path="/current" element={<Current currentPosition={props.currentPosition} />} />
      <Route path="/historical" element={<Historical currentPosition={props.currentPosition} />} />
      <Route path="/forecast" element={<Forecast currentPosition={props.currentPosition} />} />
    </Routes>
  );
};

export default AppRoutes;

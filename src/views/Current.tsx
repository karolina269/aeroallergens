import { useEffect, useRef, useState } from "react";
import { Position, PollutionData, AirQualityIndex } from "../types";
import axios from "axios";
import { Chart as ChartJS, DoughnutController, ArcElement, Tooltip, Legend } from "chart.js";
import { apiKey } from "../config";
import { airQualityStandards } from "../App";
import "./Current.css";

interface CurrentPollutionProps {
  currentPosition: Position;
}

ChartJS.register(DoughnutController, ArcElement, Tooltip, Legend);

const Current = (props: CurrentPollutionProps) => {
  const chartRef = useRef<any>(null);
  const [chartInstance, setChartInstance] = useState<any>(null);
  const [currentPollution, setCurrentPollution] = useState<PollutionData>({
    aqi: 2,
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

  useEffect(() => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/air_pollution?lat=${props.currentPosition.lat}&lon=${props.currentPosition.lng}&appid=${apiKey}`
      )
      .then((res) => {
        console.log(res.data);
        const date = new Date(res.data.list[0].dt * 1000).toUTCString();
        setCurrentPollution({ aqi: res.data.list[0].main.aqi, dt: date, components: res.data.list[0].components });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        drawChartWithNeedle(); // because of 429 (Too Many Requests)
      });
  }, [props]);

  const data = {
    labels: Object.keys(AirQualityIndex).filter((key) => /^[A-Z]/.test(key)),
    datasets: [
      {
        data: [1, 1, 1, 1, 1],
        backgroundColor: ["rgb(0,228,0)", "rgb(255,255,0)", "rgb(255,126,0)", "rgb(255,0,0)", "rgb(153,0,76)"],
        borderColor: ["rgb(0,228,0)", "rgb(255,255,0)", "rgb(255,126,0)", "rgb(255,0,0)", "rgb(153,0,76)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    rotation: -90,
    circumference: 180,
    cutout: "70%",
    aspectRatio: 1.5,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    animation: {
      onComplete: (chart: any) => {
        drawNeedle(chart);
      },
    },
  };

  const drawNeedle = (chart: any) => {
    if (!chart) {
      return;
    }
    const aqi = currentPollution.aqi;
    const needleValue = (180 / 5) * aqi - 180 / 10;
    const center = chart.chart.chartArea;
    console.log(center);
    const ctx = chart.chart.ctx;
    ctx.save();
    ctx.translate(center.left + center.width / 2, center.height / 1.15);
    ctx.rotate((Math.PI / 180) * (needleValue - 90));
    ctx.beginPath();
    ctx.moveTo(0, -150);
    ctx.lineTo(5, 0);
    ctx.lineTo(0, 0);
    ctx.lineTo(-5, 0);
    ctx.closePath();
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.restore();
  };

  const drawChartWithNeedle = () => {
    if (chartRef.current) {
      if (chartInstance) {
        chartInstance.destroy();
      }
      const newChartInstance = new ChartJS(chartRef.current, {
        type: "doughnut",
        data: data,
        options: options,
      });
      setChartInstance(newChartInstance);
    }
  };

  return (
    <section className="currentPollution">
      <h2>Current</h2>
      <h3>Date: {currentPollution.dt}</h3>
      <h3>Air Quality: {AirQualityIndex[currentPollution.aqi]}</h3>
      <div className="airQualityChart">
        <canvas ref={chartRef} />
      </div>
      <ul>
        <li>
          CO: {currentPollution.components.co} µg/m3, standard: {airQualityStandards.co} µg/m3
        </li>
        <li>
          NO2: {currentPollution.components.no2} µg/m3, standard: {airQualityStandards.no2} µg/m3
        </li>
        <li>
          O3: {currentPollution.components.o3} µg/m3, standard: {airQualityStandards.o3} µg/m3
        </li>
        <li>
          PM2.5: {currentPollution.components.pm2_5} µg/m3, standard: {airQualityStandards.pm2_5} µg/m3
        </li>
        <li>
          PM10: {currentPollution.components.pm10} µg/m3, standard: {airQualityStandards.pm10} µg/m3
        </li>
        <li>
          SO2: {currentPollution.components.so2} µg/m3, standard: {airQualityStandards.so2} µg/m3
        </li>
      </ul>
    </section>
  );
};

export default Current;

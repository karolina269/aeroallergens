import { AirQualityIndex } from "../../types";
import { Chart as ChartJS, DoughnutController, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useRef, useState } from "react";

interface CurrentAirQuality {
  aqi: AirQualityIndex;
  dataReceived: Boolean;
}

ChartJS.register(DoughnutController, ArcElement, Tooltip, Legend);

const CurrentAirQuality = (props: CurrentAirQuality) => {
  const canvasChartRef = useRef<any>(null);
  const [chartInstance, setChartInstance] = useState<any>(null);

  useEffect(() => {
    if (props.dataReceived) {
      drawChartWithNeedle();
    }
  }, [props.aqi]);

  useEffect(() => {
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [chartInstance]);

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
      datalabels: {
        display: false,
      },
    },
    animation: {
      onComplete: (chart: any) => {
        drawNeedle(chart);
      },
    },
    events: [],
  };

  const drawNeedle = (chart: any) => {
    if (!chart) {
      return;
    }
    const aqi = props.aqi;
    const needleValue = (180 / 5) * aqi - 180 / 10;
    const center = chart.chart.chartArea;
    const ctx = chart.chart.ctx;
    ctx.save();
    ctx.translate(center.left + center.width / 2, center.height / 1.15);
    ctx.rotate((Math.PI / 180) * (needleValue - 90));
    ctx.beginPath();
    ctx.moveTo(0, -160);
    ctx.lineTo(5, 0);
    ctx.lineTo(0, 0);
    ctx.lineTo(-5, 0);
    ctx.closePath();
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.restore();
  };

  const chartIdRef = useRef<any>(null);

  const drawChartWithNeedle = () => {
    if (canvasChartRef.current) {
      if (chartIdRef.current !== null) {
        return;
      }
      const newChartInstance = new ChartJS(canvasChartRef.current, {
        type: "doughnut",
        data: data,
        options: options,
      });
      chartIdRef.current = newChartInstance.id;
      setChartInstance(newChartInstance);
    }
  };
  return (
    <section className="currentAirQuality">
      {" "}
      <h3>Air Quality: {AirQualityIndex[props.aqi]}</h3>
      <div className="airQualityChart">
        <canvas ref={canvasChartRef} />
      </div>
    </section>
  );
};

export default CurrentAirQuality;

export interface Position {
  lat: number;
  lng: number;
}

enum AirQualityIndex {
  Good = 1,
  Fair,
  Moderate,
  Poor,
  VeryPoor,
}

export interface PollutionData {
  aqi: AirQualityIndex;
  dt: string;
  components: {
    co: number;
    nh3: number;
    no: number;
    no2: number;
    o3: number;
    pm2_5: number;
    pm10: number;
    so2: number;
  };
}

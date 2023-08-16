export interface Position {
  lat: number;
  lng: number;
}

export enum AirQualityIndex {
  Good = 1,
  Fair,
  Moderate,
  Poor,
  VeryPoor,
}

export interface PollutionData {
  aqi: AirQualityIndex;
  dt: string;
  components: Pollutants;
}

export interface Pollutants {
  co: number;
  no2: number;
  o3: number;
  pm2_5: number;
  pm10: number;
  so2: number;
}

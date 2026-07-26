import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface GeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
}

export interface GeocodingResponse {
  results?: GeocodingResult[];
}

export interface CurrentWeather {
  temperature_2m: number;
  relative_humidity_2m: number;
  wind_speed_10m: number;
  weather_code: number;
}

export interface WeatherResponse {
  current: CurrentWeather;
}

@Injectable({
  providedIn: 'root',
})
export class Weather {
  private readonly http = inject(HttpClient);

  searchCity(city: string): Observable<GeocodingResponse> {
    const url =
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

    return this.http.get<GeocodingResponse>(url);
  }

  getWeather(latitude: number, longitude: number): Observable<WeatherResponse> {
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`;

    return this.http.get<WeatherResponse>(url);
  }
}

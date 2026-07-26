import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent
} from '@ionic/angular/standalone';

import {
  CurrentWeather,
  GeocodingResult,
  Weather,
} from '../services/weather';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSearchbar,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    FormsModule,
    NgIf,
  ],
})
export class HomePage implements OnInit {
  city = 'Toronto';
  location?: GeocodingResult;
  weatherData?: CurrentWeather;

  constructor(private weather: Weather) {}

  ngOnInit(): void {
    this.loadWeather();
  }

  loadWeather(): void {
    const city = this.city.trim();
    if (!city) {
      return;
    }

    this.weather.searchCity(city).subscribe((geocodingData) => {
      const location = geocodingData.results?.[0];
      if (!location) {
        return;
      }

      this.weather.getWeather(location.latitude, location.longitude).subscribe((weatherData) => {
        this.location = location;
        this.weatherData = weatherData.current;
      });
    });
  }

  get weatherCondition(): string {
    const code = this.weatherData?.weather_code;

    if (code === 0) {
      return 'Clear';
    }
    if (code === 1 || code === 2 || code === 3) {
      return 'Cloudy';
    }
    if (code === 45 || code === 48) {
      return 'Fog';
    }
    if (code !== undefined && ((code >= 51 && code <= 67) || (code >= 80 && code <= 82))) {
      return 'Rain';
    }
    if (code !== undefined && ((code >= 71 && code <= 77) || code === 85 || code === 86)) {
      return 'Snow';
    }
    if (code !== undefined && code >= 95 && code <= 99) {
      return 'Thunderstorm';
    }

    return 'Cloudy';
  }
}

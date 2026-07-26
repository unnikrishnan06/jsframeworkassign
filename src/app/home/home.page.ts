import { Component, inject, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EMPTY, finalize, map, switchMap } from 'rxjs';
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
  IonCardContent,
  IonIcon,
  IonSpinner,
  IonToggle,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { partlySunnyOutline } from 'ionicons/icons';

import {
  CurrentWeather,
  GeocodingResult,
  Weather,
} from '../services/weather';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
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
    IonIcon,
    IonSpinner,
    IonToggle,
    FormsModule,
    NgIf,
  ],
})
export class HomePage implements OnInit {
  private readonly themeStorageKey = 'weather-app-dark-mode';
  private readonly weather = inject(Weather);

  city = 'Toronto';
  location?: GeocodingResult;
  weatherData?: CurrentWeather;
  isLoading = false;
  errorMessage = '';
  isDarkMode = false;

  constructor() {
    addIcons({ partlySunnyOutline });
    this.restoreThemePreference();
  }

  ngOnInit(): void {
    this.loadWeather();
  }

  selectQuickCity(city: string): void {
    if (this.isLoading) {
      return;
    }

    this.city = city;
    this.loadWeather();
  }

  setDarkMode(enabled: boolean): void {
    this.isDarkMode = enabled;
    document.documentElement.classList.toggle('ion-palette-dark', enabled);
    localStorage.setItem(this.themeStorageKey, String(enabled));
  }

  private restoreThemePreference(): void {
    const savedPreference = localStorage.getItem(this.themeStorageKey);
    this.isDarkMode = savedPreference === null
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : savedPreference === 'true';
    document.documentElement.classList.toggle('ion-palette-dark', this.isDarkMode);
  }

  loadWeather(): void {
    if (this.isLoading) {
      return;
    }

    const city = this.city.trim();
    if (!city) {
      this.errorMessage = 'Please enter a city name.';
      return;
    }

    this.errorMessage = '';
    this.isLoading = true;

    this.weather.searchCity(city).pipe(
      switchMap((geocodingData) => {
        const location = geocodingData.results?.[0];
        if (!location) {
          this.errorMessage = `We couldn't find "${city}". Please try another city.`;
          return EMPTY;
        }

        return this.weather.getWeather(location.latitude, location.longitude).pipe(
          map((weatherData) => ({
            location,
            currentWeather: weatherData.current,
          })),
        );
      }),
      finalize(() => {
        this.isLoading = false;
      }),
    ).subscribe({
      next: ({ location, currentWeather }) => {
        this.location = location;
        this.weatherData = currentWeather;
      },
      error: () => {
        this.errorMessage = 'Weather data is unavailable right now. Please check your connection and try again.';
      },
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

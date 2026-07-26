import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Weather } from './weather';

describe('Weather', () => {
  let service: Weather;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Weather,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(Weather);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should request a city from Open-Meteo geocoding', () => {
    service.searchCity('New York').subscribe();

    const request = httpTesting.expectOne(
      'https://geocoding-api.open-meteo.com/v1/search?name=New%20York&count=1&language=en&format=json'
    );

    expect(request.request.method).toBe('GET');
    request.flush({ results: [] });
  });

  it('should request current weather for coordinates', () => {
    service.getWeather(43.7, -79.42).subscribe();

    const request = httpTesting.expectOne(
      'https://api.open-meteo.com/v1/forecast?latitude=43.7&longitude=-79.42&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code'
    );

    expect(request.request.method).toBe('GET');
    request.flush({
      current: {
        temperature_2m: 20,
        relative_humidity_2m: 55,
        wind_speed_10m: 12,
        weather_code: 0,
      },
    });
  });
});

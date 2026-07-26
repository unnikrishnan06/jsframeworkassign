import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { Weather } from '../services/weather';
import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let weather: jasmine.SpyObj<Weather>;

  beforeEach(async () => {
    localStorage.clear();
    document.documentElement.classList.remove('ion-palette-dark');
    weather = jasmine.createSpyObj<Weather>('Weather', ['searchCity', 'getWeather']);
    weather.searchCity.and.returnValue(of({
      results: [{
        id: 6167865,
        name: 'Toronto',
        latitude: 43.7,
        longitude: -79.42,
        country: 'Canada',
      }],
    }));
    weather.getWeather.and.returnValue(of({
      current: {
        temperature_2m: 20,
        relative_humidity_2m: 55,
        wind_speed_10m: 12,
        weather_code: 0,
      },
    }));

    await TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [{ provide: Weather, useValue: weather }],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and load Toronto weather', () => {
    expect(component).toBeTruthy();
    expect(weather.searchCity).toHaveBeenCalledWith('Toronto');
    expect(component.location?.name).toBe('Toronto');
    expect(component.weatherCondition).toBe('Clear');
  });

  it('should show a message for empty city input', () => {
    weather.searchCity.calls.reset();
    component.city = '   ';

    component.loadWeather();

    expect(weather.searchCity).not.toHaveBeenCalled();
    expect(component.errorMessage).toBe('Please enter a city name.');
  });

  it('should immediately search when Barrie is selected', () => {
    weather.searchCity.calls.reset();

    component.selectQuickCity('Barrie');

    expect(component.city).toBe('Barrie');
    expect(weather.searchCity).toHaveBeenCalledOnceWith('Barrie');
  });

  it('should toggle dark mode and save the preference', () => {
    component.setDarkMode(true);

    expect(component.isDarkMode).toBeTrue();
    expect(document.documentElement.classList.contains('ion-palette-dark')).toBeTrue();
    expect(localStorage.getItem('weather-app-dark-mode')).toBe('true');

    component.setDarkMode(false);

    expect(document.documentElement.classList.contains('ion-palette-dark')).toBeFalse();
    expect(localStorage.getItem('weather-app-dark-mode')).toBe('false');
  });

  it('should restore a saved dark mode preference', () => {
    fixture.destroy();
    localStorage.setItem('weather-app-dark-mode', 'true');

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;

    expect(component.isDarkMode).toBeTrue();
    expect(document.documentElement.classList.contains('ion-palette-dark')).toBeTrue();
  });
});

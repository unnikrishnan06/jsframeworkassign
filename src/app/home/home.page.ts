import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
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

import { Weather } from '../services/weather';

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
    IonCardContent
  ],
})
export class HomePage {

  weatherData: any;

  constructor(private weather: Weather) {}

  loadWeather() {

    this.weather.getWeather(43.6532, -79.3832).subscribe((data) => {
      console.log(data);
      this.weatherData = data.current;
    });
  }

}
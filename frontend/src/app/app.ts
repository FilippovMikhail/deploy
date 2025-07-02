import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IWeather, WeatherService } from './weather.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  providers: [WeatherService],
  imports: [CommonModule],
  template: `
  <p>Weather</p>
  <ul>
    @for (item of weather$ | async; track item.date) {
      <li>
        date: {{item.date}}
        temperatureC: {{item.temperatureC}}
        summary: {{item.summary}}
        temperatureF: {{item.temperatureF}}
      </li>
    } @empty {
      <li>Loading weather data or no data available...</li>
    }
  </ul>
  `,
  styleUrl: './app.css'
})
export class App {
  protected title = 'frontend';
  private weatherForecast = inject(WeatherService);
  weather$!: Observable<IWeather[]>;
  ngOnInit() {
    this.weather$ = this.weatherForecast.getWeatherForecast();
  }
}

import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable()
export class WeatherService {
    private urlPrefix = '/api/';
    private urlWeatherForecast = 'weatherforecast/'
    private http = inject(HttpClient);
    public getWeatherForecast() {
        // return this.http.get<IWeather[]>(this.urlPrefix + this.urlWeatherForecast);
        return this.http.get<IWeather[]>('http://localhost:5209/weatherforecast/');
    }
}

export interface IWeather {
    date: string;
    temperatureC: number;
    summary: string;
    temperatureF: number;
}
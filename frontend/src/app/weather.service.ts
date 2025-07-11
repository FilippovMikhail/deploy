import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../environments/environment.prod";

@Injectable()
export class WeatherService {
    private apiUrl = environment.apiUrl;
    private http = inject(HttpClient);
    public getWeatherForecast() {
        return this.http.get<IWeather[]>(`${this.apiUrl}/weatherforecast/`);
    }
}

export interface IWeather {
    date: string;
    temperatureC: number;
    summary: string;
    temperatureF: number;
}
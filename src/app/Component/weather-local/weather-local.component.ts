import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-local',
  templateUrl: './weather-local.component.html',
  styleUrls: ['./weather-local.component.css']
})

export class WeatherLocalComponent implements OnInit {

    res: object;
    data: object;

    weather: number;
    localWeather: number;
    lat: number;
    lon: number;

    url: string;
    apiKey: string;
    city: string;
    location: string;

    constructor() { }

    ngOnInit(): void {
        this.weather = null;
        this.localWeather = null;
        this.city = null;

        this.location = 'Lisbon, Portugal';
        this.lat = 38.7223;
        this.lon = 9.1393;

        this.url = 'https://api.openweathermap.org/data/2.5';
        this.apiKey = '&appid=d999c28416a3ddfa9333ba6b67985a20';
        this.getLocalWeather();
        this.getLocation();
    }

    save = (event) => {
        this.city = event.target.value;
        this.getWeather();
    }

    getWeather = () => {
        fetch(this.url + '/weather?q=' + this.city + this.apiKey)
        .then(res => res.json())
        .then(data => { this.showWeather(data); });
    }

    showWeather = (data) => {
        this.weather = Math.round(data.main.temp - 273);
    }

    getLocalWeather = () => {
        fetch(this.url + '/onecall?lat=' + this.lat + '&lon=' + this.lon + this.apiKey)
        .then(res => res.json())
        .then(data => { this.showLocalWeather(data); });
    }

    showLocalWeather = (data) => {
        this.localWeather = Math.round(data.current.temp - 273);
    }

    getLocation(): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(Error('No support for geolocation'));
                return;
            }

            navigator.geolocation.getCurrentPosition((position) => {
                this.lon = position.coords.longitude;
                this.lat = position.coords.latitude;
                this.location = 'Your current Location';
                this.getLocalWeather();
            });
        });
    }
}

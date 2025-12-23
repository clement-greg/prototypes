import { Component, OnInit } from '@angular/core';

import { LottiePlayerComponent } from '../../dependencies/lottie-player/lottie-player.component';
import { DotLottieComponent } from '../../dependencies/dot-lottie/dot-lottie.component';
import { UtilitiesService } from '../../dependencies/utilities';

class StateAndForecast {
  state: 'UT' | 'AZ' | 'NV';
  forecast: forcastItem[];

  get backgroundVideoUrl() {
    if (this.state === 'UT') {
      return 'https://elevateh.blob.core.windows.net/cdn/video/scenery/utah-skiing.mov';
    }
    if (this.state === 'AZ') {
      return 'https://elevateh.blob.core.windows.net/cdn/video/scenery/az-landscape.mp4';
    }
    if (this.state === 'NV') {
      return 'https://elevateh.blob.core.windows.net/cdn/video/scenery/vegas-night-2.mov';
    }

    return '';
  }
}

class forcastItem {
  dayName: string;
  icon: string;
  high: number;
  low: number;

  get lottieUrl() {
    if (this.icon.indexOf('ovc?') > -1) {
      return 'https://lottie.host/564a22d9-7087-4bc1-b0ae-afc0cdbc6242/xVxMavFfzu.json';
    }
    if (this.icon === 'https://api.weather.gov/icons/land/day/sct?size=medium') {
      //partly cloudy
      return 'https://lottie.host/480e23e1-f4b3-4055-a34f-63ce0070e0b0/FFz1NxBuQN.json';
    }
    if (this.icon === 'https://api.weather.gov/icons/land/day/bkn?size=medium') {
      return 'https://lottie.host/52340395-d2d8-478a-abda-725957fdc858/3uqT9F57V6.json';
    }
    if (this.icon === 'https://api.weather.gov/icons/land/day/few?size=medium') {
      // Might need a light cloud icon
      return 'https://lottie.host/480e23e1-f4b3-4055-a34f-63ce0070e0b0/FFz1NxBuQN.json'
    }
    if (this.icon.indexOf('snow') > -1) {
      return 'https://lottie.host/795153bb-d9b8-42fb-a117-5e2332d31efb/t2aILb3QbM.json';
    }
    if (this.icon.indexOf('rain') > -1) {
      return 'https://lottie.host/c62b09e6-d9fb-45bf-9505-70d86040d7ec/4XjqxJZnZF.json';
    } if (this.icon === 'https://api.weather.gov/icons/land/day/cold?size=medium') {
      return 'https://lottie.host/e8e9c130-9ab3-4736-9a8d-065a21791cbe/nOTmjhR4Ss.json';
    }
    console.error('Unknown icon', this.icon);
    return '';
  }
}


@Component({
    selector: 'app-weather-slide',
    imports: [LottiePlayerComponent, DotLottieComponent],
    templateUrl: './weather-slide.component.html',
    styleUrl: './weather-slide.component.scss'
})
export class WeatherSlideComponent implements OnInit {

  location: 'UT' | 'AZ' | 'NV' = 'UT';


  azForecastJson = `
  [
        {
            "dayName": "Wed",
            "icon": "https://api.weather.gov/icons/land/day/sct?size=medium",
            "high": 64,
            "low": 46
        },
        {
            "dayName": "Thu",
            "icon": "https://api.weather.gov/icons/land/day/bkn/rain_showers,20?size=medium",
            "high": 71,
            "low": 55
        },
        {
            "dayName": "Fri",
            "icon": "https://api.weather.gov/icons/land/day/rain_showers,70/rain_showers,60?size=medium",
            "high": 70,
            "low": 46
        },
        {
            "dayName": "Sat",
            "icon": "https://api.weather.gov/icons/land/day/few?size=medium",
            "high": 70,
            "low": 46
        },
        {
            "dayName": "Sun",
            "icon": "https://api.weather.gov/icons/land/day/sct?size=medium",
            "high": 74,
            "low": 50
        },
        {
            "dayName": "Mon",
            "icon": "https://api.weather.gov/icons/land/day/bkn?size=medium",
            "high": 77,
            "low": 47
        },
        {
            "dayName": "Tue",
            "icon": "https://api.weather.gov/icons/land/day/few?size=medium",
            "high": 77,
            "low": 47
        }
    ]`;

  nvForecastJson = `
    [
          {
              "dayName": "Wed",
              "icon": "https://api.weather.gov/icons/land/day/sct?size=medium",
              "high": 64,
              "low": 46
          },
          {
              "dayName": "Thu",
              "icon": "https://api.weather.gov/icons/land/day/bkn/rain_showers,20?size=medium",
              "high": 71,
              "low": 55
          },
          {
              "dayName": "Fri",
              "icon": "https://api.weather.gov/icons/land/day/rain_showers,70/rain_showers,60?size=medium",
              "high": 70,
              "low": 46
          },
          {
              "dayName": "Sat",
              "icon": "https://api.weather.gov/icons/land/day/few?size=medium",
              "high": 70,
              "low": 46
          },
          {
              "dayName": "Sun",
              "icon": "https://api.weather.gov/icons/land/day/sct?size=medium",
              "high": 74,
              "low": 50
          },
          {
              "dayName": "Mon",
              "icon": "https://api.weather.gov/icons/land/day/bkn?size=medium",
              "high": 77,
              "low": 47
          },
          {
              "dayName": "Tue",
              "icon": "https://api.weather.gov/icons/land/day/few?size=medium",
              "high": 77,
              "low": 47
          }
      ]`;

  utahForecastJson = `
[
        {
            "dayName": "Wed",
            "icon": "https://api.weather.gov/icons/land/day/sct?size=medium",
            "high": 23,
            "low": 10
        },
        {
            "dayName": "Thu",
            "icon": "https://api.weather.gov/icons/land/day/snow,90/snow,100?size=medium",
            "high": 35,
            "low": 31
        },
        {
            "dayName": "Fri",
            "icon": "https://api.weather.gov/icons/land/day/snow,100?size=medium",
            "high": 40,
            "low": 29
        },
        {
            "dayName": "Sat",
            "icon": "https://api.weather.gov/icons/land/day/snow,80/snow,50?size=medium",
            "high": 35,
            "low": 19
        },
        {
            "dayName": "Sun",
            "icon": "https://api.weather.gov/icons/land/day/snow?size=medium",
            "high": 42,
            "low": 31
        },
        {
            "dayName": "Mon",
            "icon": "https://api.weather.gov/icons/land/day/snow?size=medium",
            "high": 41,
            "low": 26
        },
        {
            "dayName": "Tue",
            "icon": "https://api.weather.gov/icons/land/day/snow?size=medium",
            "high": 37,
            "low": 23
        }
    ]`;

  states: StateAndForecast[] = UtilitiesService.copyArrayToTypedArray([
    {
      state: 'AZ',
      forecast: UtilitiesService.copyArrayToTypedArray(JSON.parse(this.azForecastJson), () => new forcastItem())
    },
    {
      state: 'NV',
      forecast: UtilitiesService.copyArrayToTypedArray(JSON.parse(this.nvForecastJson))
    },
    {
      state: 'UT',
      forecast: UtilitiesService.copyArrayToTypedArray(JSON.parse(this.utahForecastJson))
    }
  ], () => new StateAndForecast());


  forcast: forcastItem[];
  displayForcast: forcastItem[] = [];

  ngOnInit(): void {
    let json = '';
    switch (this.location) {
      case 'AZ':
        json = this.azForecastJson;
        break;
      case 'NV':
        json = this.nvForecastJson;
        break;
      case 'UT':
        json = this.utahForecastJson;
        break;
    }
    this.forcast = JSON.parse(json);
    this.forcast = UtilitiesService.copyArrayToTypedArray(this.forcast, () => new forcastItem());

    //Limit the size of the array to 5
    this.forcast = this.forcast.slice(0, 5);
    this.addToForcast();
  }

  addToForcast() {
    if (this.forcast.length === 0) {
      return;
    }
    this.displayForcast.push(this.forcast.shift());
    setTimeout(() => this.addToForcast(), 750);
  }

  get phoenixTimeFromLocalTime() {
    return new Date().toLocaleString('en-US', { timeZone: 'America/Phoenix', hour: 'numeric', minute: 'numeric', hour12: true });
  }

  get lasVegasTimeFromLocalTime() {
    return new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles', hour: 'numeric', minute: 'numeric', hour12: true });
  }

  get saltLakeCityTimeFromLocalTime() {
    return new Date().toLocaleString('en-US', { timeZone: 'America/Denver', hour: 'numeric', minute: 'numeric', hour12: true });
  }

  get time() {
    switch (this.location) {
      case 'AZ':
        return this.phoenixTimeFromLocalTime;
      case 'NV':
        return this.lasVegasTimeFromLocalTime;
      case 'UT':
        return this.saltLakeCityTimeFromLocalTime;
    }
  }

  get cityName() {
    switch (this.location) {
      case 'AZ':
        return 'Phoenix';
      case 'NV':
        return 'Las Vegas';
      case 'UT':
        return 'Salt Lake City';
    }
  }

  get stateName() {
    switch (this.location) {
      case 'AZ':
        return 'Arizona';
      case 'NV':
        return 'Nevada';
      case 'UT':
        return 'Utah';
    }
  }

  // convert this utc time to local time: 2025-02-12 18:02:45.647Z



}


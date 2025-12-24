import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface GeolocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
  timestamp: number;
}

@Component({
  selector: 'app-location-tracking',
  imports: [CommonModule],
  templateUrl: './location-tracking.component.html',
  styleUrl: './location-tracking.component.scss',
})
export class LocationTrackingComponent implements OnInit, OnDestroy {
  @Input() trackingEnabled = true;
  @Input() updateInterval = 1000; // milliseconds

  geolocations: GeolocationData[] = [];
  isTracking = false;
  lastLocation: GeolocationData | null = null;
  errorMessage: string | null = null;
  totalDistance = 0; // in meters
  private watchId: number | null = null;

  ngOnInit(): void {
    if (this.trackingEnabled) {
      this.startTracking();
    }
  }

  startTracking(): void {
    if (!('geolocation' in navigator)) {
      this.errorMessage = 'Geolocation is not supported by this browser';
      return;
    }

    if (this.isTracking) {
      return;
    }

    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };

    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        const geoData: GeolocationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          altitude: position.coords.altitude,
          altitudeAccuracy: position.coords.altitudeAccuracy,
          heading: position.coords.heading,
          speed: position.coords.speed,
          timestamp: position.timestamp
        };

        // Calculate distance from last location
        if (this.lastLocation) {
          const distance = this.calculateDistance(
            this.lastLocation.latitude,
            this.lastLocation.longitude,
            geoData.latitude,
            geoData.longitude
          );
          this.totalDistance += distance;
        }

        this.geolocations.push(geoData);
        this.lastLocation = geoData;
        this.errorMessage = null;
      },
      (error) => {
        this.handleGeolocationError(error);
      },
      options
    );

    this.isTracking = true;
  }

  stopTracking(): void {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId);
      this.watchId = null;
      this.isTracking = false;
    }
  }

  private handleGeolocationError(error: GeolocationPositionError): void {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        this.errorMessage = 'Location permission denied. Please enable location access in browser settings.';
        break;
      case error.POSITION_UNAVAILABLE:
        this.errorMessage = 'Location information is currently unavailable.';
        break;
      case error.TIMEOUT:
        this.errorMessage = 'Location request timed out.';
        break;
      default:
        this.errorMessage = 'An unknown error occurred while retrieving location.';
    }
  }

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371000; // Earth's radius in meters
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // distance in meters
  }

  getLocationHistory(): GeolocationData[] {
    return [...this.geolocations];
  }

  clearLocationHistory(): void {
    this.geolocations = [];
    this.lastLocation = null;
    this.totalDistance = 0;
  }

  getLocationCount(): number {
    return this.geolocations.length;
  }

  getTotalDistance(): { meters: number; kilometers: number } {
    return {
      meters: Math.round(this.totalDistance),
      kilometers: Math.round(this.totalDistance / 1000 * 100) / 100
    };
  }

  exportLocationsAsJSON(): string {
    return JSON.stringify(this.geolocations, null, 2);
  }

  ngOnDestroy(): void {
    this.stopTracking();
  }
}

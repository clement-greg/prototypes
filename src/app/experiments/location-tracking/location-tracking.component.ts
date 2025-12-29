import { Component, OnInit, OnDestroy, Input, ElementRef, ViewChild } from '@angular/core';
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
  @Input() googleMapsApiKey?: string = 'AIzaSyDEHHVWjBc0ivnk3TSRwISAi5e3NGT87iQ'; // provide to enable map rendering

  @ViewChild('mapRef', { static: false }) mapRef!: ElementRef<HTMLDivElement>;

  geolocations: GeolocationData[] = [];
  isTracking = false;
  lastLocation: GeolocationData | null = null;
  errorMessage: string | null = null;
  totalDistance = 0; // in meters
  private watchId: number | null = null;
  private map: any = null;

  // Global type for Google Maps without installing types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private get google(): any {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (window as any).google;
  }

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

  /**
   * Static helper that returns dummy geolocation samples approximating
   * a ~1.5 mile (≈2.4 km) northbound jog along Central Park West Drive.
   *
   * Start: near Columbus Circle (40.7681, -73.9819)
   * End: mid-park near 79th St (≈40.7882, -73.9696)
   *
   * Distances are approximate; timestamps are spaced by 30s.
   */
  static sampleCentralParkJog(count = 120): GeolocationData[] {
    // Start near Columbus Circle, end mid-park near 79th St
    const start = { lat: 40.7681, lon: -73.9819 };
    const end = { lat: 40.7882, lon: -73.9696 };

    const accuracy = 10;   // meters
    const speed = 2.8;     // m/s (~10 km/h)
    const heading = 20;    // degrees roughly NNE
    const tsStepMs = 10_000; // 10 seconds between samples
    const startTs = Date.now() - count * tsStepMs;

    const out: GeolocationData[] = [];
    for (let i = 0; i < count; i++) {
      const t = i / Math.max(1, count - 1);
      // Linear interpolation with a gentle meander on longitude to mimic path curvature
      const lat = start.lat + (end.lat - start.lat) * t;
      const lonLinear = start.lon + (end.lon - start.lon) * t;
      const lonCurve = 0.0008 * Math.sin(t * Math.PI * 1.2);
      const lon = lonLinear + lonCurve;

      out.push({
        latitude: lat,
        longitude: lon,
        accuracy,
        altitude: null,
        altitudeAccuracy: null,
        heading,
        speed,
        timestamp: startTs + i * tsStepMs,
      });
    }
    return out;
  }

  // Load Google Maps JS API if needed and render dummy route
  async loadDummyRouteOnMap(): Promise<void> {
    try {
      await this.ensureMapsApiLoaded();

      // Populate geolocations with dummy jog and compute distance
      const pts = LocationTrackingComponent.sampleCentralParkJog(120);
      this.geolocations = pts;
      this.lastLocation = pts.at(-1) || null;
      this.totalDistance = 0;
      for (let i = 1; i < pts.length; i++) {
        this.totalDistance += this.calculateDistance(
          pts[i - 1].latitude,
          pts[i - 1].longitude,
          pts[i].latitude,
          pts[i].longitude
        );
      }

      this.createMapIfNeeded(pts[0]);

      const path = pts.map(p => ({ lat: p.latitude, lng: p.longitude }));

      // Fit bounds to path
      const bounds = new this.google.maps.LatLngBounds();
      path.forEach(p => bounds.extend(p));
      this.map.fitBounds(bounds);

      // Draw polyline
      const polyline = new this.google.maps.Polyline({
        path,
        strokeColor: '#1976d2',
        strokeOpacity: 0.9,
        strokeWeight: 4,
      });
      polyline.setMap(this.map);

      // Start and end markers
      new this.google.maps.Marker({ position: path[0], map: this.map, label: 'Start' });
      new this.google.maps.Marker({ position: path[path.length - 1], map: this.map, label: 'End' });
    } catch (err) {
      console.error('Map load error:', err);
      this.errorMessage = (err as Error)?.message ?? 'Failed to load Google Maps';
    }
  }

  private createMapIfNeeded(center: GeolocationData): void {
    if (this.map) { return; }
    const el = this.mapRef?.nativeElement;
    if (!el) {
      throw new Error('Map container not found');
    }
    this.map = new this.google.maps.Map(el, {
      center: { lat: center.latitude, lng: center.longitude },
      zoom: 14,
      mapTypeId: 'terrain',
    });
  }

  private ensureMapsApiLoaded(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.google && this.google.maps) {
        resolve();
        return;
      }
      if (!this.googleMapsApiKey) {
        reject(new Error('Google Maps API key required to load map. Set `googleMapsApiKey`.'));
        return;
      }
      const existing = document.querySelector('script[data-role="gmaps-loader"]');
      if (existing) {
        existing.addEventListener('load', () => resolve());
        existing.addEventListener('error', () => reject(new Error('Failed to load Google Maps script')));
        return;
      }
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${this.googleMapsApiKey}`;
      script.async = true;
      script.defer = true;
      script.setAttribute('data-role', 'gmaps-loader');
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Google Maps script'));
      document.head.appendChild(script);
    });
  }
}

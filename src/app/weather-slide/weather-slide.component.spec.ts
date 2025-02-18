import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherSlideComponent } from './weather-slide.component';

describe('WeatherSlideComponent', () => {
  let component: WeatherSlideComponent;
  let fixture: ComponentFixture<WeatherSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherSlideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

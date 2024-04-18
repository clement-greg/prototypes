import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CogentLoadRadialComponent } from './cogent-load-radial.component';

describe('CogentLoadRadialComponent', () => {
  let component: CogentLoadRadialComponent;
  let fixture: ComponentFixture<CogentLoadRadialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CogentLoadRadialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CogentLoadRadialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

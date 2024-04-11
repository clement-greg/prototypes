import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CogentLoadPulseComponent } from './cogent-load-pulse.component';

describe('CogentLoadPulseComponent', () => {
  let component: CogentLoadPulseComponent;
  let fixture: ComponentFixture<CogentLoadPulseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CogentLoadPulseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CogentLoadPulseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CogentLoadValentinesDayComponent } from './cogent-load-valentines-day.component';

describe('CogentLoadValentinesDayComponent', () => {
  let component: CogentLoadValentinesDayComponent;
  let fixture: ComponentFixture<CogentLoadValentinesDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CogentLoadValentinesDayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CogentLoadValentinesDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CogentLoadThanksgivingComponent } from './cogent-load-thanksgiving.component';

describe('CogentLoadThanksgivingComponent', () => {
  let component: CogentLoadThanksgivingComponent;
  let fixture: ComponentFixture<CogentLoadThanksgivingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CogentLoadThanksgivingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CogentLoadThanksgivingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

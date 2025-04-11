import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CogentLoadBirthdayComponent } from './cogent-load-birthday.component';

describe('CogentLoadBirthdayComponent', () => {
  let component: CogentLoadBirthdayComponent;
  let fixture: ComponentFixture<CogentLoadBirthdayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CogentLoadBirthdayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CogentLoadBirthdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

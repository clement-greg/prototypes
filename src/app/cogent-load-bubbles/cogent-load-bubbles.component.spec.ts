import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CogentLoadBubblesComponent } from './cogent-load-bubbles.component';

describe('CogentLoadBubblesComponent', () => {
  let component: CogentLoadBubblesComponent;
  let fixture: ComponentFixture<CogentLoadBubblesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CogentLoadBubblesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CogentLoadBubblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

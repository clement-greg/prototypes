import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CogentLoadHalloweenComponent } from './cogent-load-halloween.component';

describe('CogentLoadHalloweenComponent', () => {
  let component: CogentLoadHalloweenComponent;
  let fixture: ComponentFixture<CogentLoadHalloweenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CogentLoadHalloweenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CogentLoadHalloweenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

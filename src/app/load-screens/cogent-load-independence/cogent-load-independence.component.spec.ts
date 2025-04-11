import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CogentLoadIndependenceComponent } from './cogent-load-independence.component';

describe('CogentLoadIndependenceComponent', () => {
  let component: CogentLoadIndependenceComponent;
  let fixture: ComponentFixture<CogentLoadIndependenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CogentLoadIndependenceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CogentLoadIndependenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

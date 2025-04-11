import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CogentLoadStPatricksComponent } from './cogent-load-st-patricks.component';

describe('CogentLoadStPatricksComponent', () => {
  let component: CogentLoadStPatricksComponent;
  let fixture: ComponentFixture<CogentLoadStPatricksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CogentLoadStPatricksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CogentLoadStPatricksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

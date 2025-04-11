import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CogentLoadHexComponent } from './cogent-load-hex.component';

describe('CogentLoadHexComponent', () => {
  let component: CogentLoadHexComponent;
  let fixture: ComponentFixture<CogentLoadHexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CogentLoadHexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CogentLoadHexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

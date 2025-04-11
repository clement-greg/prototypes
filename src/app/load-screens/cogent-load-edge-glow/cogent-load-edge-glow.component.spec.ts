import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CogentLoadEdgeGlowComponent } from './cogent-load-edge-glow.component';

describe('CogentLoadEdgeGlowComponent', () => {
  let component: CogentLoadEdgeGlowComponent;
  let fixture: ComponentFixture<CogentLoadEdgeGlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CogentLoadEdgeGlowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CogentLoadEdgeGlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

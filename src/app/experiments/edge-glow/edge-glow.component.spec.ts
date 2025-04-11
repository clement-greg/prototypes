import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdgeGlowComponent } from './edge-glow.component';

describe('EdgeGlowComponent', () => {
  let component: EdgeGlowComponent;
  let fixture: ComponentFixture<EdgeGlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdgeGlowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdgeGlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

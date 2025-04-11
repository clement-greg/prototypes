import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CogentLoadNeumorphismComponent } from './cogent-load-neumorphism.component';

describe('CogentLoadNeumorphismComponent', () => {
  let component: CogentLoadNeumorphismComponent;
  let fixture: ComponentFixture<CogentLoadNeumorphismComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CogentLoadNeumorphismComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CogentLoadNeumorphismComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

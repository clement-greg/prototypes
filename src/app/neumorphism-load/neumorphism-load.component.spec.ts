import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeumorphismLoadComponent } from './neumorphism-load.component';

describe('NeumorphismLoadComponent', () => {
  let component: NeumorphismLoadComponent;
  let fixture: ComponentFixture<NeumorphismLoadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NeumorphismLoadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeumorphismLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

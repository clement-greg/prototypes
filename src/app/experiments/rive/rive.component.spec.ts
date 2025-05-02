import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiveComponent } from './rive.component';

describe('RiveComponent', () => {
  let component: RiveComponent;
  let fixture: ComponentFixture<RiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

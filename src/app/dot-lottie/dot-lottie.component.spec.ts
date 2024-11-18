import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DotLottieComponent } from './dot-lottie.component';

describe('DotLottieComponent', () => {
  let component: DotLottieComponent;
  let fixture: ComponentFixture<DotLottieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DotLottieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DotLottieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

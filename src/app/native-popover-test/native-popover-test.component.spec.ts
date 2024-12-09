import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NativePopoverTestComponent } from './native-popover-test.component';

describe('NativePopoverTestComponent', () => {
  let component: NativePopoverTestComponent;
  let fixture: ComponentFixture<NativePopoverTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NativePopoverTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NativePopoverTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

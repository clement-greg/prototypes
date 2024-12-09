import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NativeDialogTestComponent } from './native-dialog-test.component';

describe('NativeDialogTestComponent', () => {
  let component: NativeDialogTestComponent;
  let fixture: ComponentFixture<NativeDialogTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NativeDialogTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NativeDialogTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

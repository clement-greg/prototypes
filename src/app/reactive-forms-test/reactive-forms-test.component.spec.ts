import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsTestComponent } from './reactive-forms-test.component';

describe('ReactiveFormsTestComponent', () => {
  let component: ReactiveFormsTestComponent;
  let fixture: ComponentFixture<ReactiveFormsTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactiveFormsTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewYears2026Component } from './new-years-2026.component';

describe('NewYears2026Component', () => {
  let component: NewYears2026Component;
  let fixture: ComponentFixture<NewYears2026Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewYears2026Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewYears2026Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

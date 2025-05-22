import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindAeComponent } from './find-ae.component';

describe('FindAeComponent', () => {
  let component: FindAeComponent;
  let fixture: ComponentFixture<FindAeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindAeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindAeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

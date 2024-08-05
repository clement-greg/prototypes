import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackToSchoolComponent } from './back-to-school.component';

describe('BackToSchoolComponent', () => {
  let component: BackToSchoolComponent;
  let fixture: ComponentFixture<BackToSchoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackToSchoolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackToSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

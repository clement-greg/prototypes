import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CogentLoadDarkAndShineyComponent } from './cogent-load-dark-and-shiney.component';

describe('CogentLoadDarkAndShineyComponent', () => {
  let component: CogentLoadDarkAndShineyComponent;
  let fixture: ComponentFixture<CogentLoadDarkAndShineyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CogentLoadDarkAndShineyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CogentLoadDarkAndShineyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

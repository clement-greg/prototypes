import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CogentBallLoadComponent } from './cogent-ball-load.component';

describe('CogentBallLoadComponent', () => {
  let component: CogentBallLoadComponent;
  let fixture: ComponentFixture<CogentBallLoadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CogentBallLoadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CogentBallLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

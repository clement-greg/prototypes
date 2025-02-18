import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CogentLoadWavesComponent } from './cogent-load-waves.component';

describe('CogentLoadWavesComponent', () => {
  let component: CogentLoadWavesComponent;
  let fixture: ComponentFixture<CogentLoadWavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CogentLoadWavesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CogentLoadWavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

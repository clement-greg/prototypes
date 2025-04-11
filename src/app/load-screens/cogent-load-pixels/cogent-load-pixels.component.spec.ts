import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CogentLoadPixelsComponent } from './cogent-load-pixels.component';

describe('CogentLoadPixelsComponent', () => {
  let component: CogentLoadPixelsComponent;
  let fixture: ComponentFixture<CogentLoadPixelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CogentLoadPixelsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CogentLoadPixelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

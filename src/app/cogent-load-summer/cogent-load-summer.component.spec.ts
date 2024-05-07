import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CogentLoadSummerComponent } from './cogent-load-summer.component';

describe('CogentLoadSummerComponent', () => {
  let component: CogentLoadSummerComponent;
  let fixture: ComponentFixture<CogentLoadSummerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CogentLoadSummerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CogentLoadSummerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

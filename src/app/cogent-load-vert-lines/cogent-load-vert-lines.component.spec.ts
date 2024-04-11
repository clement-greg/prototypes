import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CogentLoadVertLinesComponent } from './cogent-load-vert-lines.component';

describe('CogentLoadVertLinesComponent', () => {
  let component: CogentLoadVertLinesComponent;
  let fixture: ComponentFixture<CogentLoadVertLinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CogentLoadVertLinesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CogentLoadVertLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

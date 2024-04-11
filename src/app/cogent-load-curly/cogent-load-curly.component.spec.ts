import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CogentLoadCurlyComponent } from './cogent-load-curly.component';

describe('CogentLoadCurlyComponent', () => {
  let component: CogentLoadCurlyComponent;
  let fixture: ComponentFixture<CogentLoadCurlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CogentLoadCurlyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CogentLoadCurlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

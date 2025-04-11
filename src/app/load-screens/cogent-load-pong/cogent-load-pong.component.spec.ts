import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CogentLoadPongComponent } from './cogent-load-pong.component';

describe('CogentLoadPongComponent', () => {
  let component: CogentLoadPongComponent;
  let fixture: ComponentFixture<CogentLoadPongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CogentLoadPongComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CogentLoadPongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

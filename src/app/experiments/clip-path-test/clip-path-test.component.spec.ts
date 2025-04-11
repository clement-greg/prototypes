import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClipPathTestComponent } from './clip-path-test.component';

describe('ClipPathTestComponent', () => {
  let component: ClipPathTestComponent;
  let fixture: ComponentFixture<ClipPathTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClipPathTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClipPathTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

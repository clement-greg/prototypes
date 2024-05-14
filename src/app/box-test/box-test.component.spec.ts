import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxTestComponent } from './box-test.component';

describe('BoxTestComponent', () => {
  let component: BoxTestComponent;
  let fixture: ComponentFixture<BoxTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoxTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

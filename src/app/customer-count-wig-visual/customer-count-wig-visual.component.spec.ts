import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCountWigVisualComponent } from './customer-count-wig-visual.component';

describe('CustomerCountWigVisualComponent', () => {
  let component: CustomerCountWigVisualComponent;
  let fixture: ComponentFixture<CustomerCountWigVisualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerCountWigVisualComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerCountWigVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

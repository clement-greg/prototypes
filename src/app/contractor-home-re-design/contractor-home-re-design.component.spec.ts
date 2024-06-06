import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorHomeReDesignComponent } from './contractor-home-re-design.component';

describe('ContractorHomeReDesignComponent', () => {
  let component: ContractorHomeReDesignComponent;
  let fixture: ComponentFixture<ContractorHomeReDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractorHomeReDesignComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContractorHomeReDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

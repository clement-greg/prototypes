import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CogentLoadHalloween2Component } from './cogent-load-halloween-2.component';

describe('CogentLoadHalloween2Component', () => {
  let component: CogentLoadHalloween2Component;
  let fixture: ComponentFixture<CogentLoadHalloween2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CogentLoadHalloween2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CogentLoadHalloween2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

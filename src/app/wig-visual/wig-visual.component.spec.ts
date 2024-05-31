import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WigVisualComponent } from './wig-visual.component';

describe('WigVisualComponent', () => {
  let component: WigVisualComponent;
  let fixture: ComponentFixture<WigVisualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WigVisualComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WigVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

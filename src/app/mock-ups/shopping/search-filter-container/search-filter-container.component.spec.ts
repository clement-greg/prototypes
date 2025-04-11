import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFilterContainerComponent } from './search-filter-container.component';

describe('SearchFilterContainerComponent', () => {
  let component: SearchFilterContainerComponent;
  let fixture: ComponentFixture<SearchFilterContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchFilterContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchFilterContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

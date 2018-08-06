import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VaSearchComponent } from './va-search.component';

describe('VaSearchComponent', () => {
  let component: VaSearchComponent;
  let fixture: ComponentFixture<VaSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VaSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VaSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

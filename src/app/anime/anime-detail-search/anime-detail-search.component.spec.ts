import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeDetailSearchComponent } from './anime-detail-search.component';

describe('VaSearchComponent', () => {
  let component: AnimeDetailSearchComponent;
  let fixture: ComponentFixture<AnimeDetailSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimeDetailSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimeDetailSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

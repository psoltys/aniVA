import { TestBed, inject } from '@angular/core/testing';

import { AniQueryService } from '../shared/ani-query.service';

describe('AnimeSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AniQueryService]
    });
  });

  it('should be created', inject([AniQueryService], (service: AniQueryService) => {
    expect(service).toBeTruthy();
  }));
});

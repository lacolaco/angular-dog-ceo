import { TestBed } from '@angular/core/testing';

import { DogApi } from './dog-api.service';

describe('DogApiService', () => {
  let service: DogApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DogApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

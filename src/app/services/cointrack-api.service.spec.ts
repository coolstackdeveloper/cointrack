import { TestBed } from '@angular/core/testing';
import { CoinTrackApiService } from './cointrack-api.service';

describe('CoinTrackApiService', () => {
  let service: CoinTrackApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoinTrackApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

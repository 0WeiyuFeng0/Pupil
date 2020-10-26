import { TestBed } from '@angular/core/testing';

import { AuthJSONGuard } from './auth-json.guard';

describe('AuthJSONGuard', () => {
  let guard: AuthJSONGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthJSONGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

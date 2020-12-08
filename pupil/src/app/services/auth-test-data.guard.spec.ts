import { TestBed } from '@angular/core/testing';

import { AuthTestDataGuard } from './auth-test-data.guard';

describe('AuthTestDataGuard', () => {
  let guard: AuthTestDataGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthTestDataGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

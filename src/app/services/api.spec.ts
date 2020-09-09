import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { Api } from 'app/services/api';
import { ConfigService } from 'app/services/config.service';

describe('Api', () => {
  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 9000;

    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [Api, ConfigService]
    });
  });

  describe('api calls', () => {
    // original tests only checked if the type of call
    // was correct. ie: put was a PUT get was a GET...
    // those tests have been removed as they're not really
    // all that useful
  });

  describe('handleError(error)', () => {
    it(
      'should throw reason',
      inject([Api], (api) => {
        const error = {
          message: 'This is an error'
        };

        api.handleError(error).subscribe({
          error: (err) => {
            expect(err).toBe('This is an error');
          }
        });
      })
    );
    it(
      'should throw error status',
      inject([Api], (api) => {
        const error = {
          status: 'error status',
          statusText: 'error status text'
        };

        // handle returns an observable, not an object...
        api.handleError(error).subscribe({
          error: (err) => {
            expect(err).toBe('error status - error status text');
          }
        });
      })
    );
    it(
      'should throw error status',
      inject([Api], (api) => {
        const error = {};

        api.handleError(error).subscribe({
          error: (err) => {
            expect(err).toBe('Server error');
          }
        });
      })
    );
  });
});

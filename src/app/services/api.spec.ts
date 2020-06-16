import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { Api } from 'app/services/api';

describe('Api', () => {
  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 9000;

    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [Api]
    });
  });

  describe('getHostName()', () => {
    describe('localhost', () => {
      it(
        'should return http://localhost:4000',
        inject([Api], (api) => {
          expect(api.getHostName('localhost').hostnameMEM).toBe('http://localhost:4000');
        })
      );
    });
    describe('www-mem-mmt-dev.pathfinder.gov.bc.ca', () => {
      it(
        'should return http://localhost:4000',
        inject([Api], (api) => {
          expect(api.getHostName('www-mem-mmt-dev.pathfinder.gov.bc.ca').hostnameMEM).toBe(
            'https://mem-mmt-dev.pathfinder.gov.bc.ca'
          );
        })
      );
    });
    describe('www-mem-mmt-test.pathfinder.gov.bc.ca', () => {
      it(
        'should return https://mem-mmt-test.pathfinder.gov.bc.ca',
        inject([Api], (api) => {
          expect(api.getHostName('www-mem-mmt-test.pathfinder.gov.bc.ca').hostnameMEM).toBe(
            'https://mem-mmt-test.pathfinder.gov.bc.ca'
          );
        })
      );
    });
    describe('http://mines.nrs.gov.bc.ca/', () => {
      it(
        'should return https://mem-mmt-test.pathfinder.gov.bc.ca',
        inject([Api], (api) => {
          expect(api.getHostName('mines.nrs.gov.bc.ca/').hostnameMEM).toBe('https://mines.empr.gov.bc.ca');
        })
      );
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

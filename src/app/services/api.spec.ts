import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule, HttpResponse, HttpXhrBackend } from '@angular/common/http';
import { MockBackend } from '@angular/http/testing';
import 'rxjs/add/observable/throw';
import { Api } from './api';

describe('Api', () => {
  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 9000;

    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [Api, { provide: HttpXhrBackend, useClass: MockBackend }]
    });
  });

  describe('getHostName()', () => {
    describe('localhost', () => {
      it(
        'should return http://localhost:3000',
        inject([Api, HttpXhrBackend], (api) => {
          expect(api.getHostName('localhost').hostnameEPIC).toBe('http://localhost:3000');
        })
      );
      it(
        'should return http://localhost:4000',
        inject([Api, HttpXhrBackend], (api) => {
          expect(api.getHostName('localhost').hostnameMEM).toBe('http://localhost:4000');
        })
      );
    });
    describe('www-mem-mmt-dev.pathfinder.gov.bc.ca', () => {
      it(
        'should return https://esm-master.pathfinder.gov.bc.ca',
        inject([Api, HttpXhrBackend], (api) => {
          expect(api.getHostName('www-mem-mmt-dev.pathfinder.gov.bc.ca').hostnameEPIC).toBe(
            'https://esm-master.pathfinder.gov.bc.ca'
          );
        })
      );
      it(
        'should return http://localhost:4000',
        inject([Api, HttpXhrBackend], (api) => {
          expect(api.getHostName('www-mem-mmt-dev.pathfinder.gov.bc.ca').hostnameMEM).toBe(
            'https://mem-mmt-dev.pathfinder.gov.bc.ca'
          );
        })
      );
    });
    describe('www-mem-mmt-test.pathfinder.gov.bc.ca', () => {
      it(
        'should return https://test.projects.eao.gov.bc.ca',
        inject([Api, HttpXhrBackend], (api) => {
          expect(api.getHostName('www-mem-mmt-test.pathfinder.gov.bc.ca').hostnameEPIC).toBe(
            'https://test.projects.eao.gov.bc.ca'
          );
        })
      );
      it(
        'should return https://mem-mmt-test.pathfinder.gov.bc.ca',
        inject([Api, HttpXhrBackend], (api) => {
          expect(api.getHostName('www-mem-mmt-test.pathfinder.gov.bc.ca').hostnameMEM).toBe(
            'https://mem-mmt-test.pathfinder.gov.bc.ca'
          );
        })
      );
    });
    describe('http://mines.nrs.gov.bc.ca/', () => {
      it(
        'should return https://projects.eao.gov.bc.ca',
        inject([Api, HttpXhrBackend], (api) => {
          expect(api.getHostName('mines.nrs.gov.bc.ca/').hostnameEPIC).toBe('https://projects.eao.gov.bc.ca');
        })
      );
      it(
        'should return https://mem-mmt-test.pathfinder.gov.bc.ca',
        inject([Api, HttpXhrBackend], (api) => {
          expect(api.getHostName('mines.nrs.gov.bc.ca/').hostnameMEM).toBe('https://mines.empr.gov.bc.ca');
        })
      );
    });
  });

  describe('api calls', () => {
    describe('getProjects()', () => {
      it(
        'should make a GET request',
        inject([Api, HttpXhrBackend], (api, mockBackend) => {
          mockBackend.connections.subscribe(connection => {
            expect(connection.request.method).toEqual('GET');
          });
          api.getProjects();
        })
      );
      it(
        'should make a request to /projects/major',
        inject([Api, HttpXhrBackend], (api, mockBackend) => {
          api.pathMEM = 'http://blarg/api';

          mockBackend.connections.subscribe(connection => {
            expect(connection.request.url).toEqual('http://blarg/api/projects/major');
          });

          api.getProjects();
        })
      );
      it(
        'should return an object',
        inject([Api, HttpXhrBackend], (api, mockBackend) => {
          const mockHttpResponse = {};

          mockBackend.connections.subscribe(connection => {
            connection.mockRespond(
              new HttpResponse({
                  body: JSON.stringify(mockHttpResponse)
              }
              )
            );
          });

          api.getProjects().subscribe(resp => {
            expect(resp).toBeTruthy();
          });
        })
      );
    });
    describe('getProjectByCode(projectCode)', () => {
      let projectCode: string;

      beforeEach(() => {
        projectCode = 'ajax-mine';
      });
      it(
        'should make a GET request',
        inject([Api, HttpXhrBackend], (api, mockBackend) => {
          mockBackend.connections.subscribe(connection => {
            expect(connection.request.method).toEqual('GET');
          });

          api.getProjectByCode(projectCode);
        })
      );
      it(
        'should make a request to /project/public/${ projectCode }',
        inject([Api, HttpXhrBackend], (api, mockBackend) => {
          api.pathMEM = 'http://blarg/api';

          mockBackend.connections.subscribe(connection => {
            expect(connection.request.url).toEqual('http://blarg/api/projects/major/ajax-mine');
          });

          api.getProjectByCode(projectCode);
        })
      );
      it(
        'should return an object',
        inject([Api, HttpXhrBackend], (api, mockBackend) => {
          const mockHttpResponse = {};

          mockBackend.connections.subscribe(connection => {
            connection.mockRespond(
              new HttpResponse(
                {
                  body: JSON.stringify(mockHttpResponse)
                }
              )
            );
          });

          api.getProjectByCode(projectCode).subscribe(resp => {
            expect(resp).toBeTruthy();
          });
        })
      );
    });
    describe('getProjectCollectionsMEM(projectCode)', () => {
      let projectCode: string;

      beforeEach(() => {
        projectCode = 'test-code';
      });
      it(
        'should make a GET request',
        inject([Api, HttpXhrBackend], (api, mockBackend) => {
          mockBackend.connections.subscribe(connection => {
            expect(connection.request.method).toEqual('GET');
          });

          api.getProjectCollectionsMEM(projectCode);
        })
      );
      it(
        'should make a request to /collections/project/${ projectCode }',
        inject([Api, HttpXhrBackend], (api, mockBackend) => {
          api.pathMEM = 'http://blarg/api';

          mockBackend.connections.subscribe(connection => {
            expect(connection.request.url).toEqual('http://blarg/api/collections/project/test-code');
          });

          api.getProjectCollectionsMEM(projectCode);
        })
      );
      it(
        'should return an object',
        inject([Api, HttpXhrBackend], (api, mockBackend) => {
          const mockHttpResponse = {};

          mockBackend.connections.subscribe(connection => {
            connection.mockRespond(
              new HttpResponse(
                {
                  body: JSON.stringify(mockHttpResponse)
                }
              )
            );
          });

          api.getProjectCollectionsMEM(projectCode).subscribe(resp => {
            expect(resp).toBeTruthy();
          });
        })
      );
    });
    describe('getProjectCollectionsEPIC(projectCode)', () => {
      let projectCode: string;

      beforeEach(() => {
        projectCode = 'test-code';
      });
      it(
        'should make a GET request',
        inject([Api, HttpXhrBackend], (api, mockBackend) => {
          mockBackend.connections.subscribe(connection => {
            expect(connection.request.method).toEqual('GET');
          });

          api.getProjectCollectionsEPIC(projectCode);
        })
      );
      it(
        'should make a request to /collections/project/${ projectCode }',
        inject([Api, HttpXhrBackend], (api, mockBackend) => {
          api.pathEPIC = 'http://blarg/api';

          mockBackend.connections.subscribe(connection => {
            expect(connection.request.url).toEqual('http://blarg/api/collections/project/test-code');
          });

          api.getProjectCollectionsEPIC(projectCode);
        })
      );
      it(
        'should return an object',
        inject([Api, HttpXhrBackend], (api, mockBackend) => {
          const mockHttpResponse = {};

          mockBackend.connections.subscribe(connection => {
            connection.mockRespond(
              new HttpResponse(
                {
                  body: JSON.stringify(mockHttpResponse)
                }
              )
            );
          });

          api.getProjectCollectionsEPIC(projectCode).subscribe(resp => {
            expect(resp).toBeTruthy();
          });
        })
      );
    });
    describe('getProponents()', () => {
      it(
        'should make a GET request',
        inject([Api, HttpXhrBackend], (api, mockBackend) => {
          mockBackend.connections.subscribe(connection => {
            expect(connection.request.method).toEqual('GET');
          });

          api.getProponents();
        })
      );
      it(
        'should make a request to /organization',
        inject([Api, HttpXhrBackend], (api, mockBackend) => {
          api.pathMEM = 'http://blarg/api';

          mockBackend.connections.subscribe(connection => {
            expect(connection.request.url).toEqual('http://blarg/api/organization');
          });

          api.getProponents();
        })
      );
      it(
        'should return an object',
        inject([Api, HttpXhrBackend], (api, mockBackend) => {
          const mockHttpResponse = {};

          mockBackend.connections.subscribe(connection => {
            connection.mockRespond(
              new HttpResponse(
                {
                  body: JSON.stringify(mockHttpResponse)
                }
              )
            );
          });

          api.getProponents().subscribe(resp => {
            expect(resp).toBeTruthy();
          });
        })
      );
    });
  });

  describe('http calls', () => {
    describe('getMEM(apiRoute, options?)', () => {
      it(
        'should make a GET request',
        inject([Api, HttpXhrBackend], (api, mockBackend) => {
          const apiRoute = 'projects';
          api.pathMEM = 'http://blarg/api';

          mockBackend.connections.subscribe(connection => {
            expect(connection.request.method).toEqual('GET');
          });

          api.getMEM(apiRoute);
        })
      );
      it(
        'should make a request to the specified path',
        inject([Api, HttpXhrBackend], (api, mockBackend) => {
          const apiRoute = 'projects';
          api.pathMEM = 'http://blarg/api';

          mockBackend.connections.subscribe(connection => {
            expect(connection.request.url).toEqual('http://blarg/api/projects');
          });

          api.getMEM(apiRoute);
        })
      );
    });
    describe('getEPIC(apiRoute, options?)', () => {
      it(
        'should make a GET request',
        inject([Api, HttpXhrBackend], (api, mockBackend) => {
          const apiRoute = 'projects';
          api.pathEPIC = 'http://blarg/api';

          mockBackend.connections.subscribe(connection => {
            expect(connection.request.method).toEqual('GET');
          });

          api.getEPIC(apiRoute);
        })
      );
      it(
        'should make a request to the specified path',
        inject([Api, HttpXhrBackend], (api, mockBackend) => {
          const apiRoute = 'projects';
          api.pathEPIC = 'http://blarg/api';

          mockBackend.connections.subscribe(connection => {
            expect(connection.request.url).toEqual('http://blarg/api/projects');
          });

          api.getEPIC(apiRoute);
        })
      );
    });
    describe('putMEM(apiRoute, body?, options?)', () => {
      it(
        'should make a PUT request',
        inject([Api, HttpXhrBackend], (api, mockBackend) => {
          const apiRoute = 'projects';
          api.pathMEM = 'http://blarg/api';

          mockBackend.connections.subscribe(connection => {
            expect(connection.request.method).toEqual('PUT');
          });

          api.putMEM(apiRoute);
        })
      );
      it(
        'should make a request to the specified path',
        inject([Api, HttpXhrBackend], (api, mockBackend) => {
          const apiRoute = 'projects';
          api.pathMEM = 'http://blarg/api';

          mockBackend.connections.subscribe(connection => {
            expect(connection.request.url).toEqual('http://blarg/api/projects');
          });

          api.putMEM(apiRoute);
        })
      );
    });
    describe('putEPIC(apiRoute, body?, options?)', () => {
      it(
        'should make a PUT request',
        inject([Api, HttpXhrBackend], (api, mockBackend) => {
          const apiRoute = 'projects';
          api.pathEPIC = 'http://blarg/api';

          mockBackend.connections.subscribe(connection => {
            expect(connection.request.method).toEqual('PUT');
          });

          api.putEPIC(apiRoute);
        })
      );
      it(
        'should make a request to the specified path',
        inject([Api, HttpXhrBackend], (api, mockBackend) => {
          const apiRoute = 'projects';
          api.pathEPIC = 'http://blarg/api';

          mockBackend.connections.subscribe(connection => {
            expect(connection.request.url).toEqual('http://blarg/api/projects');
          });

          api.putEPIC(apiRoute);
        })
      );
    });
  });

  describe('handleError(error)', () => {
    it(
      'should throw reason',
      inject([Api, HttpXhrBackend], (api) => {
        const error = {
          message: 'This is an error'
        };

        const err = api.handleError(error);

        expect(err.error).toBe('This is an error');
      })
    );
    it(
      'should throw error status',
      inject([Api, HttpXhrBackend], (api) => {
        const error = {
          status: 'error status',
          statusText: 'error status text'
        };

        const err = api.handleError(error);
        expect(err.error).toBe('error status - error status text');
      })
    );
    it(
      'should throw error status',
      inject([Api, HttpXhrBackend], (api) => {
        const error = {};

        const err = api.handleError(error);
        expect(err.error).toBe('Server error');
      })
    );
  });
});

import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http, Response, ResponseOptions, BaseRequestOptions, XHRBackend, RequestMethod } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

import { Api } from './api';

describe('Api', () => {

  function mockBackEnd(mockResponse: any, mockBackend: any) {
    // Subscribe to opened http connections
    mockBackend.connections.subscribe((connection) => {
      // Have connection send a response
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });
  }

  beforeEach(() => {
    const window = {
      location: {
        hostname: 'www-esm-master.pathfinder.gov.bc.ca'
      }
    };

    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        Api,
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

  describe('getHostName()', () => {
    describe('localhost', () => {
      it('should return http://localhost:3000',
        inject([Api, XHRBackend], (api, mockBackend) => {

        expect(api.getHostName('localhost').hostnameEPIC).toBe('http://localhost:3000');
      }));
      it('should return http://localhost:4000',
        inject([Api, XHRBackend], (api, mockBackend) => {

        expect(api.getHostName('localhost').hostnameMEM).toBe('http://localhost:4000');
      }));
    });
    describe('www-mem-mmt-dev.pathfinder.gov.bc.ca', () => {
      it('should return https://esm-master.pathfinder.gov.bc.ca',
        inject([Api, XHRBackend], (api, mockBackend) => {

        expect(api.getHostName('www-mem-mmt-dev.pathfinder.gov.bc.ca').hostnameEPIC).toBe('https://esm-master.pathfinder.gov.bc.ca');
      }));
      it('should return http://localhost:4000',
        inject([Api, XHRBackend], (api, mockBackend) => {

        expect(api.getHostName('www-mem-mmt-dev.pathfinder.gov.bc.ca').hostnameMEM).toBe('https://mem-mmt-dev.pathfinder.gov.bc.ca');
      }));
    });
    describe('www-mem-mmt-test.pathfinder.gov.bc.ca', () => {
      it('should return https://test.projects.eao.gov.bc.ca',
      inject([Api, XHRBackend], (api, mockBackend) => {

      expect(api.getHostName('www-mem-mmt-test.pathfinder.gov.bc.ca').hostnameEPIC).toBe('https://test.projects.eao.gov.bc.ca');
    }));
      it('should return https://mem-mmt-test.pathfinder.gov.bc.ca',
        inject([Api, XHRBackend], (api, mockBackend) => {

        expect(api.getHostName('www-mem-mmt-test.pathfinder.gov.bc.ca').hostnameMEM).toBe('https://mem-mmt-test.pathfinder.gov.bc.ca');
      }));
    });
    describe('http://mines.nrs.gov.bc.ca/', () => {
      it('should return https://projects.eao.gov.bc.ca',
        inject([Api, XHRBackend], (api, mockBackend) => {

        expect(api.getHostName('mines.nrs.gov.bc.ca/').hostnameEPIC).toBe('https://projects.eao.gov.bc.ca');
      }));
      it('should return https://mem-mmt-test.pathfinder.gov.bc.ca',
        inject([Api, XHRBackend], (api, mockBackend) => {

        expect(api.getHostName('mines.nrs.gov.bc.ca/').hostnameMEM).toBe('https://mines.empr.gov.bc.ca');
      }));
    });
  });

  describe('api calls', () => {
    describe('getProjects()', () => {
      it('should make a GET request',
        inject([Api, XHRBackend], (api, mockBackend) => {

        api.getProjects();

        mockBackend.connections.subscribe((connection) => {
          // Have connection send a response
          expect(connection.request.method).toEqual(RequestMethod.Get);
        });
      }));
      it('should make a request to /projects/major',
        inject([Api, XHRBackend], (api, mockBackend) => {

        api.pathMEM = 'http://blarg/api';

        api.getProjects();

        mockBackend.connections.subscribe((connection) => {
          // Have connection send a response
          expect(connection.request.url).toEqual('http://blarg/api/projects/major');
        });
      }));
      it('should return an object',
        inject([Api, XHRBackend], (api, mockBackend) => {

        const mockResponse = {};

        mockBackEnd(mockResponse, mockBackend);

        api.getProjects().subscribe(
          resp => {
            expect(resp).toBeTruthy;
          }
        );
      }));
    });
    describe('getProjectByCode(projectCode)', () => {
      let projectCode: string;

      beforeEach(() => {
        projectCode = 'ajax-mine';
      });
      it('should make a GET request',
        inject([Api, XHRBackend], (api, mockBackend) => {

        mockBackend.connections.subscribe((connection) => {
          // Have connection send a response
          expect(connection.request.method).toEqual(RequestMethod.Get);
        });

        api.getProjectByCode(projectCode);
      }));
      it('should make a request to /project/public/${ projectCode }',
        inject([Api, XHRBackend], (api, mockBackend) => {

        api.pathMEM = 'http://blarg/api';

        mockBackend.connections.subscribe((connection) => {
          // Have connection send a response
          expect(connection.request.url).toEqual('http://blarg/api/projects/major/ajax-mine');
        });

        api.getProjectByCode(projectCode);
      }));
      it('should return an object',
        inject([Api, XHRBackend], (api, mockBackend) => {

        const mockResponse = {};

        mockBackEnd(mockResponse, mockBackend);

        api.getProjectByCode(projectCode).subscribe(
          resp => {
            expect(resp).toBeTruthy;
          }
        );
      }));
    });
    describe('getProjectCollectionsMEM(projectCode)', () => {
      let projectCode: string;

      beforeEach(() => {
        projectCode = 'test-code';
      });
      it('should make a GET request',
        inject([Api, XHRBackend], (api, mockBackend) => {

        mockBackend.connections.subscribe((connection) => {
          // Have connection send a response
          expect(connection.request.method).toEqual(RequestMethod.Get);
        });

        api.getProjectCollectionsMEM(projectCode);
      }));
      it('should make a request to /collections/project/${ projectCode }',
        inject([Api, XHRBackend], (api, mockBackend) => {

        api.pathMEM = 'http://blarg/api';

        mockBackend.connections.subscribe((connection) => {
          // Have connection send a response
          expect(connection.request.url).toEqual('http://blarg/api/collections/project/test-code');
        });

        api.getProjectCollectionsMEM(projectCode);
      }));
      it('should return an object',
        inject([Api, XHRBackend], (api, mockBackend) => {

        const mockResponse = {};

        mockBackEnd(mockResponse, mockBackend);

        api.getProjectCollectionsMEM(projectCode).subscribe(
          resp => {
            expect(resp).toBeTruthy;
          }
        );
      }));
    });
    describe('getProjectCollectionsEPIC(projectCode)', () => {
      let projectCode: string;

      beforeEach(() => {
        projectCode = 'test-code';
      });
      it('should make a GET request',
        inject([Api, XHRBackend], (api, mockBackend) => {

        mockBackend.connections.subscribe((connection) => {
          // Have connection send a response
          expect(connection.request.method).toEqual(RequestMethod.Get);
        });

        api.getProjectCollectionsEPIC(projectCode);
      }));
      it('should make a request to /collections/project/${ projectCode }',
        inject([Api, XHRBackend], (api, mockBackend) => {

        api.pathEPIC = 'http://blarg/api';

        mockBackend.connections.subscribe((connection) => {
          // Have connection send a response
          expect(connection.request.url).toEqual('http://blarg/api/collections/project/test-code');
        });

        api.getProjectCollectionsEPIC(projectCode);
      }));
      it('should return an object',
        inject([Api, XHRBackend], (api, mockBackend) => {

        const mockResponse = {};

        mockBackEnd(mockResponse, mockBackend);

        api.getProjectCollectionsEPIC(projectCode).subscribe(
          resp => {
            expect(resp).toBeTruthy;
          }
        );
      }));
    });
    describe('getProponents()', () => {
      it('should make a GET request',
        inject([Api, XHRBackend], (api, mockBackend) => {

        api.getProponents();

        mockBackend.connections.subscribe((connection) => {
          // Have connection send a response
          expect(connection.request.method).toEqual(RequestMethod.Get);
        });
      }));
      it('should make a request to /organization',
        inject([Api, XHRBackend], (api, mockBackend) => {

        api.pathMEM = 'http://blarg/api';

        api.getProponents();

        mockBackend.connections.subscribe((connection) => {
          // Have connection send a response
          expect(connection.request.url).toEqual('http://blarg/api/organization');
        });
      }));
      it('should return an object',
        inject([Api, XHRBackend], (api, mockBackend) => {

        const mockResponse = {};

        mockBackEnd(mockResponse, mockBackend);

        api.getProponents().subscribe(
          resp => {
            expect(resp).toBeTruthy;
          }
        );
      }));
    });
  });

  describe('http calls', () => {
    describe('getMEM(apiRoute, options?)', () => {
      it('should make a GET request',
        inject([Api, XHRBackend], (api, mockBackend) => {

        const apiRoute = 'projects';
        api.pathMEM = 'http://blarg/api';

        mockBackend.connections.subscribe((connection) => {
          // Have connection send a response
          expect(connection.request.method).toEqual(RequestMethod.Get);
        });

        api.getMEM(apiRoute);
      }));
      it('should make a request to the specified path',
        inject([Api, XHRBackend], (api, mockBackend) => {

        const apiRoute = 'projects';
        api.pathMEM = 'http://blarg/api';

        mockBackend.connections.subscribe((connection) => {
          // Have connection send a response
          expect(connection.request.url).toEqual('http://blarg/api/projects');
        });

        api.getMEM(apiRoute);
      }));
    });
    describe('getEPIC(apiRoute, options?)', () => {
      it('should make a GET request',
        inject([Api, XHRBackend], (api, mockBackend) => {

        const apiRoute = 'projects';
        api.pathEPIC = 'http://blarg/api';

        mockBackend.connections.subscribe((connection) => {
          // Have connection send a response
          expect(connection.request.method).toEqual(RequestMethod.Get);
        });

        api.getEPIC(apiRoute);
      }));
      it('should make a request to the specified path',
        inject([Api, XHRBackend], (api, mockBackend) => {

        const apiRoute = 'projects';
        api.pathEPIC = 'http://blarg/api';

        mockBackend.connections.subscribe((connection) => {
          // Have connection send a response
          expect(connection.request.url).toEqual('http://blarg/api/projects');
        });

        api.getEPIC(apiRoute);
      }));
    });
    describe('putMEM(apiRoute, body?, options?)', () => {
      it('should make a PUT request',
        inject([Api, XHRBackend], (api, mockBackend) => {

        const apiRoute = 'projects';
        api.pathMEM = 'http://blarg/api';

        mockBackend.connections.subscribe((connection) => {
          // Have connection send a response
          expect(connection.request.method).toEqual(RequestMethod.Put);
        });

        api.putMEM(apiRoute);
      }));
      it('should make a request to the specified path',
        inject([Api, XHRBackend], (api, mockBackend) => {

        const apiRoute = 'projects';
        api.pathMEM = 'http://blarg/api';

        mockBackend.connections.subscribe((connection) => {
          // Have connection send a response
          expect(connection.request.url).toEqual('http://blarg/api/projects');
        });

        api.putMEM(apiRoute);
      }));
    });
    describe('putEPIC(apiRoute, body?, options?)', () => {
      it('should make a PUT request',
        inject([Api, XHRBackend], (api, mockBackend) => {

        const apiRoute = 'projects';
        api.pathEPIC = 'http://blarg/api';

        mockBackend.connections.subscribe((connection) => {
          // Have connection send a response
          expect(connection.request.method).toEqual(RequestMethod.Put);
        });

        api.putEPIC(apiRoute);
      }));
      it('should make a request to the specified path',
        inject([Api, XHRBackend], (api, mockBackend) => {

        const apiRoute = 'projects';
        api.pathEPIC = 'http://blarg/api';

        mockBackend.connections.subscribe((connection) => {
          // Have connection send a response
          expect(connection.request.url).toEqual('http://blarg/api/projects');
        });

        api.putEPIC(apiRoute);
      }));
    });
  });

  describe('handleError(error)', () => {
    it('should throw reason',
      inject([Api, XHRBackend], (api, mockBackend) => {

      const error = {
        message: 'This is an error'
      };

      const err = api.handleError(error);

      expect(err.error).toBe('This is an error');
    }));
    it('should throw error status',
      inject([Api, XHRBackend], (api, mockBackend) => {

      const error = {
        status: 'error status',
        statusText: 'error status text'
      };

      const err = api.handleError(error);
      expect(err.error).toBe('error status - error status text');
    }));
    it('should throw error status',
      inject([Api, XHRBackend], (api, mockBackend) => {

      const error = {};

      const err = api.handleError(error);
      expect(err.error).toBe('Server error');
    }));
  });
});

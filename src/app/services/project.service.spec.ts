import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http, Response, ResponseOptions, BaseRequestOptions, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { ProjectService } from './project.service';
import { Api } from './api';

import { Observable } from 'rxjs/Rx';

describe('ProjectService', () => {
  let responseItem;
  let projcode;

  function projectFactory(codes?: any[]) {
    return {
      code: projcode,
      epicProjectCodes: codes ? codes : []
    };
  }

  function epicProjectCodesFactory(iterations: number) {
    const epicProjectCodes = [];
    for ( let i = 0; i < iterations; i++ ) {
      epicProjectCodes.push('code' + i);
    }
    return epicProjectCodes;
  }

  function collectionFactory(parentType: string, isForMem: boolean, isForEnv) {
    return {
      parentType: parentType,
      isForMEM: isForMem,
      isForENV: isForEnv
    };
  }

  function createResponseItem(response: any) {
    responseItem = {
      response: response
    };
    return responseItem;
  }

  function createGetAllMockresponses(projectObjs: any) {
    return [
      createResponseItem(projectObjs)
    ];
  }

  function createGetByCodeMockResponses(projectObj: any, memProjectObj: any, epicProjectObj: any, numEpicCodes: number) {
    const responses = [
      createResponseItem(projectObj),
      createResponseItem(memProjectObj)
    ];
    for ( let i = 0; i < numEpicCodes; i++ ) {
      responses.push(createResponseItem(epicProjectObj));
    }
    return responses;
  }

  function mockBackEnd(mockResponses: any[], mockBackend: any) {
    // Subscribe to opened http connections
    mockBackend.connections.subscribe((connection) => {
      const mockResponse = mockResponses.shift();
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse.response)
      })));
    });
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        Api,
        ProjectService,
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });
  describe('getAll()', () => {
    describe('given an invalid response', () => {
      let mockResponses;

      beforeEach(() => {
        const projectObjs = undefined;
        mockResponses = createGetAllMockresponses(projectObjs);
      });
      it('returns 0 items',
        inject([ProjectService, XHRBackend], (projectService, mockBackend) => {

        mockBackEnd(mockResponses, mockBackend);

        projectService.getAll().subscribe(
          project => {
            expect(project.length).toBe(0);
          }
        );
      }));

      it('returns an empty array',
        inject([ProjectService, XHRBackend], (projectService, mockBackend) => {

        mockBackEnd(mockResponses, mockBackend);

        projectService.getAll().subscribe(
          project => {
            expect(JSON.stringify(project)).toBe(JSON.stringify([]));
          }
        );
      }));
    });
    describe('given a valid response', () => {
      let mockResponses;
      projcode = '1234';

      it('returns 0 items',
        inject([ProjectService, XHRBackend], (projectService, mockBackend) => {

        const projectObjs = [];
        mockResponses = createGetAllMockresponses(projectObjs);

        mockBackEnd(mockResponses, mockBackend);

        projectService.getAll().subscribe(
          project => {
            expect(project.length).toBe(0);
          }
        );
      }));
      it('returns 2 items',
        inject([ProjectService, XHRBackend], (projectService, mockBackend) => {

        const projectObjs = [
          projectFactory(),
          projectFactory()
        ];
        mockResponses = createGetAllMockresponses(projectObjs);

        mockBackEnd(mockResponses, mockBackend);

        projectService.getAll().subscribe(
          project => {
            expect(project.length).toBe(2);
          }
        );
      }));
      it('returns n items',
        inject([ProjectService, XHRBackend], (projectService, mockBackend) => {


        const projectObjs = [
          projectFactory(),
          projectFactory(),
          projectFactory(),
          projectFactory(),
          projectFactory(),
          projectFactory(),
          projectFactory(),
          projectFactory(),
          projectFactory()
        ];
        mockResponses = createGetAllMockresponses(projectObjs);

        mockBackEnd(mockResponses, mockBackend);

        projectService.getAll().subscribe(
          project => {
            expect(project.length).toBe(9);
          }
        );
      }));
    });
  });
  describe('getBycode(code)', () => {
    let mockResponses;
    let expectedResponse;
    let numEpicCodes;

    describe('given a valid response', () => {
      it('returns an empty project',
        inject([ProjectService, XHRBackend], (projectService, mockBackend) => {

        projcode = '';
        numEpicCodes = 0;

        const epicProjectCodes = epicProjectCodesFactory(numEpicCodes);
        const projObj = projectFactory(epicProjectCodes);
        const memObj = [collectionFactory('Authorizations', false, false)];
        const epicObj = [collectionFactory('Authorizations', false, false)];

        mockResponses = createGetByCodeMockResponses(projObj, memObj, epicObj, numEpicCodes);

        mockBackEnd(mockResponses, mockBackend);

        expectedResponse = [];

        projectService.getByCode(projcode).subscribe(
          project => {
            expect(project.code).toBe(null);
          }
        );
      }));

      it('returns the project corresponding to the code',
        inject([ProjectService, XHRBackend], (projectService, mockBackend) => {

        projcode = '1234';
        numEpicCodes = 3;

        const epicProjectCodes = epicProjectCodesFactory(numEpicCodes);
        const projObj = projectFactory(epicProjectCodes);
        const memObj = [collectionFactory('Compliance and Enforcement', false, false)];
        const epicObj = [collectionFactory('Other', false, false)];

        mockResponses = createGetByCodeMockResponses(projObj, memObj, epicObj, numEpicCodes);

        mockBackEnd(mockResponses, mockBackend);

        expectedResponse = [];

        projectService.getByCode(projcode).subscribe(
          project => {
            expect(project.code).toBe('1234');
          }
        );
      }));
    });
  });
  describe('getCollectionsMEM()', () => {
    let mockResponses;
    let expectedResponse;
    let numEpicCodes;

    describe('given a valid response', () => {
      it('returns 0 collection',
        inject([ProjectService, XHRBackend], (projectService, mockBackend) => {

        projcode = '';
        numEpicCodes = 0;

        const epicProjectCodes = epicProjectCodesFactory(numEpicCodes);
        const projObj = projectFactory(epicProjectCodes);
        const memObj = [];
        const epicObj = [];

        mockResponses = createGetByCodeMockResponses(projObj, memObj, epicObj, numEpicCodes);

        mockBackEnd(mockResponses, mockBackend);

        expectedResponse = [];

        projectService.getByCode(projcode).subscribe(
          project => {
            expect(project.collections.authorizations.mem.length).toBe(0);
          }
        );
      }));

      it('returns 1 collection',
        inject([ProjectService, XHRBackend], (projectService, mockBackend) => {

        projcode = '';
        numEpicCodes = 0;

        const epicProjectCodes = epicProjectCodesFactory(numEpicCodes);
        const projObj = projectFactory(epicProjectCodes);
        const memObj = [collectionFactory('Authorizations', true, false)];
        const epicObj = [];

        mockResponses = createGetByCodeMockResponses(projObj, memObj, epicObj, numEpicCodes);

        mockBackEnd(mockResponses, mockBackend);

        expectedResponse = [];

        projectService.getByCode(projcode).subscribe(
          project => {
            expect(project.collections.authorizations.mem.length).toBe(1);
          }
        );
      }));
    });
  });
  describe('getCollectionsEPIC()', () => {
    let mockResponses;
    let expectedResponse;
    let numEpicCodes;

    describe('given a valid response', () => {
      it('returns 0 collection',
        inject([ProjectService, XHRBackend], (projectService, mockBackend) => {

        projcode = '';
        numEpicCodes = 0;

        const epicProjectCodes = epicProjectCodesFactory(numEpicCodes);
        const projObj = projectFactory(epicProjectCodes);
        const memObj = [];
        const epicObj = [];

        mockResponses = createGetByCodeMockResponses(projObj, memObj, epicObj, numEpicCodes);

        mockBackEnd(mockResponses, mockBackend);

        expectedResponse = [];

        projectService.getByCode(projcode).subscribe(
          project => {
            expect(project.collections.authorizations.eao.length).toBe(0);
            expect(project.collections.authorizations.env.length).toBe(0);
            expect(project.collections.authorizations.mem.length).toBe(0);
            expect(project.collections.compliance.length).toBe(0);
            expect(project.collections.documents.length).toBe(0);
          }
        );
      }));

      it('returns 1 collection',
        inject([ProjectService, XHRBackend], (projectService, mockBackend) => {

        projcode = '';
        numEpicCodes = 1;

        const epicProjectCodes = epicProjectCodesFactory(numEpicCodes);
        const projObj = projectFactory(epicProjectCodes);
        const memObj = [];
        const epicObj = [collectionFactory('Authorizations', false, false)];

        mockResponses = createGetByCodeMockResponses(projObj, memObj, epicObj, numEpicCodes);

        mockBackEnd(mockResponses, mockBackend);

        expectedResponse = [];

        projectService.getByCode(projcode).subscribe(
          project => {
            expect(project.collections.authorizations.eao.length).toBe(1);
          }
        );
      }));
    });
  });
  describe('addCollections(collectionsList, collection)', () => {
    let mockResponses;
    let expectedResponse;
    let numEpicCodes;

    describe('given a valid response', () => {
      describe('given parentType is Authorizations', () => {
        it('adds the collection to the eao agency in under authorizations',
          inject([ProjectService, XHRBackend], (projectService, mockBackend) => {

          projcode = '';
          numEpicCodes = 1;

          const epicProjectCodes = epicProjectCodesFactory(numEpicCodes);
          const projObj = projectFactory(epicProjectCodes);
          const memObj = [];
          const epicObj = [collectionFactory('Authorizations', false, false)];

          mockResponses = createGetByCodeMockResponses(projObj, memObj, epicObj, numEpicCodes);

          mockBackEnd(mockResponses, mockBackend);

          expectedResponse = [];

          projectService.getByCode(projcode).subscribe(
            project => {
              expect(project.collections.authorizations.eao.length).toBe(1);
            }
          );
        }));
        it('adds the collection to the mem agency in under authorizations',
          inject([ProjectService, XHRBackend], (projectService, mockBackend) => {

          projcode = '';
          numEpicCodes = 1;

          const epicProjectCodes = epicProjectCodesFactory(numEpicCodes);
          const projObj = projectFactory(epicProjectCodes);
          const memObj = [];
          const epicObj = [collectionFactory('Authorizations', true, false)];

          mockResponses = createGetByCodeMockResponses(projObj, memObj, epicObj, numEpicCodes);

          mockBackEnd(mockResponses, mockBackend);

          expectedResponse = [];

          projectService.getByCode(projcode).subscribe(
            project => {
              expect(project.collections.authorizations.mem.length).toBe(1);
            }
          );
        }));
        it('adds the collection to the env agency in under authorizations',
          inject([ProjectService, XHRBackend], (projectService, mockBackend) => {

          projcode = '';
          numEpicCodes = 1;

          const epicProjectCodes = epicProjectCodesFactory(numEpicCodes);
          const projObj = projectFactory(epicProjectCodes);
          const memObj = [];
          const epicObj = [collectionFactory('Authorizations', false, true)];

          mockResponses = createGetByCodeMockResponses(projObj, memObj, epicObj, numEpicCodes);

          mockBackEnd(mockResponses, mockBackend);

          expectedResponse = [];

          projectService.getByCode(projcode).subscribe(
            project => {
              expect(project.collections.authorizations.env.length).toBe(1);
            }
          );
        }));
      });
      describe('given parentType is Compliance and Enforcement', () => {
        it('adds the collection under compliance',
          inject([ProjectService, XHRBackend], (projectService, mockBackend) => {

          projcode = '';
          numEpicCodes = 1;

          const epicProjectCodes = epicProjectCodesFactory(numEpicCodes);
          const projObj = projectFactory(epicProjectCodes);
          const memObj = [];
          const epicObj = [collectionFactory('Compliance and Enforcement', false, false)];

          mockResponses = createGetByCodeMockResponses(projObj, memObj, epicObj, numEpicCodes);

          mockBackEnd(mockResponses, mockBackend);

          expectedResponse = [];

          projectService.getByCode(projcode).subscribe(
            project => {
              expect(project.collections.compliance.length).toBe(1);
            }
          );
        }));
        describe('given parentType is Other', () => {
          it('adds the collection under documents',
            inject([ProjectService, XHRBackend], (projectService, mockBackend) => {

            projcode = '';
            numEpicCodes = 1;

            const epicProjectCodes = epicProjectCodesFactory(numEpicCodes);
            const projObj = projectFactory(epicProjectCodes);
            const memObj = [];
            const epicObj = [collectionFactory('Other', false, false)];

            mockResponses = createGetByCodeMockResponses(projObj, memObj, epicObj, numEpicCodes);

            mockBackEnd(mockResponses, mockBackend);

            expectedResponse = [];

            projectService.getByCode(projcode).subscribe(
              project => {
                expect(project.collections.documents.length).toBe(1);
              }
            );
          }));
        });
      });
    });
  });
});

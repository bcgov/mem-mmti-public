/*import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule, HttpResponse, HttpXhrBackend } from '@angular/common/http';
import { MockBackend } from '@angular/http/testing';

import { ProjectService } from './project.service';
import { Api } from './api';

describe('ProjectService', () => {
  let HttpResponseItem;
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

  function createHttpResponseItem(HttpResponse: any) {
    HttpResponseItem = {
      HttpResponse: HttpResponse
    };
    return HttpResponseItem;
  }

  function createGetAllMockHttpResponses(projectObjs: any) {
    return [
      createHttpResponseItem(projectObjs)
    ];
  }

  function createGetByCodeMockHttpResponses(projectObj: any, memProjectObj: any, epicProjectObj: any, numEpicCodes: number) {
    const HttpResponses = [
      createHttpResponseItem(projectObj),
      createHttpResponseItem(memProjectObj)
    ];
    for ( let i = 0; i < numEpicCodes; i++ ) {
      HttpResponses.push(createHttpResponseItem(epicProjectObj));
    }
    return HttpResponses;
  }

  function mockBackEnd(mockHttpResponses: any[], mockBackend: any) {
    // Subscribe to opened http connections
    mockBackend.connections.subscribe((connection) => {
      const mockHttpResponse = mockHttpResponses.shift();
      connection.mockRespond(new HttpResponse(({
        body: JSON.stringify(mockHttpResponse.HttpResponse)
      })));
    });
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        Api,
        ProjectService,
        { provide: HttpXhrBackend, useClass: MockBackend },
      ]
    });
  });
  describe('getAll()', () => {
    describe('given an invalid HttpResponse', () => {
      let mockHttpResponses;

      beforeEach(() => {
        const projectObjs = undefined;
        mockHttpResponses = createGetAllMockHttpResponses(projectObjs);
      });
      it('returns 0 items',
        inject([ProjectService, HttpXhrBackend], (projectService, mockBackend) => {

        mockBackEnd(mockHttpResponses, mockBackend);

        projectService.getAll().subscribe(
          project => {
            expect(project.length).toBe(0);
          }
        );
      }));

      it('returns an empty array',
        inject([ProjectService, HttpXhrBackend], (projectService, mockBackend) => {

        mockBackEnd(mockHttpResponses, mockBackend);

        projectService.getAll().subscribe(
          project => {
            expect(JSON.stringify(project)).toBe(JSON.stringify([]));
          }
        );
      }));
    });
    describe('given a valid HttpResponse', () => {
      let mockHttpResponses;
      projcode = '1234';

      it('returns 0 items',
        inject([ProjectService, HttpXhrBackend], (projectService, mockBackend) => {

        const projectObjs = [];
        mockHttpResponses = createGetAllMockHttpResponses(projectObjs);

        mockBackEnd(mockHttpResponses, mockBackend);

        projectService.getAll().subscribe(
          project => {
            expect(project.length).toBe(0);
          }
        );
      }));
      it('returns 2 items',
        inject([ProjectService, HttpXhrBackend], (projectService, mockBackend) => {

        const projectObjs = [
          projectFactory(),
          projectFactory()
        ];
        mockHttpResponses = createGetAllMockHttpResponses(projectObjs);

        mockBackEnd(mockHttpResponses, mockBackend);

        projectService.getAll().subscribe(
          project => {
            expect(project.length).toBe(2);
          }
        );
      }));
      it('returns n items',
        inject([ProjectService, HttpXhrBackend], (projectService, mockBackend) => {


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
        mockHttpResponses = createGetAllMockHttpResponses(projectObjs);

        mockBackEnd(mockHttpResponses, mockBackend);

        projectService.getAll().subscribe(
          project => {
            expect(project.length).toBe(9);
          }
        );
      }));
    });
  });
  describe('getBycode(code)', () => {
    let mockHttpResponses;
    let expectedHttpResponse;
    let numEpicCodes;

    describe('given a valid HttpResponse', () => {
      it('returns an empty project',
        inject([ProjectService, HttpXhrBackend], (projectService, mockBackend) => {

        projcode = '';
        numEpicCodes = 0;

        const epicProjectCodes = epicProjectCodesFactory(numEpicCodes);
        const projObj = projectFactory(epicProjectCodes);
        const memObj = [collectionFactory('Authorizations', false, false)];
        const epicObj = [collectionFactory('Authorizations', false, false)];

        mockHttpResponses = createGetByCodeMockHttpResponses(projObj, memObj, epicObj, numEpicCodes);

        mockBackEnd(mockHttpResponses, mockBackend);

        expectedHttpResponse = [];

        projectService.getByCode(projcode).subscribe(
          project => {
            expect(project.code).toBe(null);
          }
        );
      }));

      it('returns the project corresponding to the code',
        inject([ProjectService, HttpXhrBackend], (projectService, mockBackend) => {

        projcode = '1234';
        numEpicCodes = 3;

        const epicProjectCodes = epicProjectCodesFactory(numEpicCodes);
        const projObj = projectFactory(epicProjectCodes);
        const memObj = [collectionFactory('Compliance and Enforcement', false, false)];
        const epicObj = [collectionFactory('Other', false, false)];

        mockHttpResponses = createGetByCodeMockHttpResponses(projObj, memObj, epicObj, numEpicCodes);

        mockBackEnd(mockHttpResponses, mockBackend);

        expectedHttpResponse = [];

        projectService.getByCode(projcode).subscribe(
          project => {
            expect(project.code).toBe('1234');
          }
        );
      }));
    });
  });
  describe('getCollectionsMEM()', () => {
    let mockHttpResponses;
    let expectedHttpResponse;
    let numEpicCodes;

    describe('given a valid HttpResponse', () => {
      it('returns 0 collection',
        inject([ProjectService, HttpXhrBackend], (projectService, mockBackend) => {

        projcode = '';
        numEpicCodes = 0;

        const epicProjectCodes = epicProjectCodesFactory(numEpicCodes);
        const projObj = projectFactory(epicProjectCodes);
        const memObj = [];
        const epicObj = [];

        mockHttpResponses = createGetByCodeMockHttpResponses(projObj, memObj, epicObj, numEpicCodes);

        mockBackEnd(mockHttpResponses, mockBackend);

        expectedHttpResponse = [];

        projectService.getByCode(projcode).subscribe(
          project => {
            expect(project.collections.authorizations.mem.length).toBe(0);
          }
        );
      }));

      it('returns 1 collection',
        inject([ProjectService, HttpXhrBackend], (projectService, mockBackend) => {

        projcode = '';
        numEpicCodes = 0;

        const epicProjectCodes = epicProjectCodesFactory(numEpicCodes);
        const projObj = projectFactory(epicProjectCodes);
        const memObj = [collectionFactory('Authorizations', true, false)];
        const epicObj = [];

        mockHttpResponses = createGetByCodeMockHttpResponses(projObj, memObj, epicObj, numEpicCodes);

        mockBackEnd(mockHttpResponses, mockBackend);

        expectedHttpResponse = [];

        projectService.getByCode(projcode).subscribe(
          project => {
            expect(project.collections.authorizations.mem.length).toBe(1);
          }
        );
      }));
    });
  });
  describe('getCollectionsEPIC()', () => {
    let mockHttpResponses;
    let expectedHttpResponse;
    let numEpicCodes;

    describe('given a valid HttpResponse', () => {
      it('returns 0 collection',
        inject([ProjectService, HttpXhrBackend], (projectService, mockBackend) => {

        projcode = '';
        numEpicCodes = 0;

        const epicProjectCodes = epicProjectCodesFactory(numEpicCodes);
        const projObj = projectFactory(epicProjectCodes);
        const memObj = [];
        const epicObj = [];

        mockHttpResponses = createGetByCodeMockHttpResponses(projObj, memObj, epicObj, numEpicCodes);

        mockBackEnd(mockHttpResponses, mockBackend);

        expectedHttpResponse = [];

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
        inject([ProjectService, HttpXhrBackend], (projectService, mockBackend) => {

        projcode = '';
        numEpicCodes = 1;

        const epicProjectCodes = epicProjectCodesFactory(numEpicCodes);
        const projObj = projectFactory(epicProjectCodes);
        const memObj = [];
        const epicObj = [collectionFactory('Authorizations', false, false)];

        mockHttpResponses = createGetByCodeMockHttpResponses(projObj, memObj, epicObj, numEpicCodes);

        mockBackEnd(mockHttpResponses, mockBackend);

        expectedHttpResponse = [];

        projectService.getByCode(projcode).subscribe(
          project => {
            expect(project.collections.authorizations.eao.length).toBe(1);
          }
        );
      }));
    });
  });
  describe('addCollections(collectionsList, collection)', () => {
    let mockHttpResponses;
    let expectedHttpResponse;
    let numEpicCodes;

    describe('given a valid HttpResponse', () => {
      describe('given parentType is Authorizations', () => {
        it('adds the collection to the eao agency in under authorizations',
          inject([ProjectService, HttpXhrBackend], (projectService, mockBackend) => {

          projcode = '';
          numEpicCodes = 1;

          const epicProjectCodes = epicProjectCodesFactory(numEpicCodes);
          const projObj = projectFactory(epicProjectCodes);
          const memObj = [];
          const epicObj = [collectionFactory('Authorizations', false, false)];

          mockHttpResponses = createGetByCodeMockHttpResponses(projObj, memObj, epicObj, numEpicCodes);

          mockBackEnd(mockHttpResponses, mockBackend);

          expectedHttpResponse = [];

          projectService.getByCode(projcode).subscribe(
            project => {
              expect(project.collections.authorizations.eao.length).toBe(1);
            }
          );
        }));
        it('adds the collection to the mem agency in under authorizations',
          inject([ProjectService, HttpXhrBackend], (projectService, mockBackend) => {

          projcode = '';
          numEpicCodes = 1;

          const epicProjectCodes = epicProjectCodesFactory(numEpicCodes);
          const projObj = projectFactory(epicProjectCodes);
          const memObj = [];
          const epicObj = [collectionFactory('Authorizations', true, false)];

          mockHttpResponses = createGetByCodeMockHttpResponses(projObj, memObj, epicObj, numEpicCodes);

          mockBackEnd(mockHttpResponses, mockBackend);

          expectedHttpResponse = [];

          projectService.getByCode(projcode).subscribe(
            project => {
              expect(project.collections.authorizations.mem.length).toBe(1);
            }
          );
        }));
        it('adds the collection to the env agency in under authorizations',
          inject([ProjectService, HttpXhrBackend], (projectService, mockBackend) => {

          projcode = '';
          numEpicCodes = 1;

          const epicProjectCodes = epicProjectCodesFactory(numEpicCodes);
          const projObj = projectFactory(epicProjectCodes);
          const memObj = [];
          const epicObj = [collectionFactory('Authorizations', false, true)];

          mockHttpResponses = createGetByCodeMockHttpResponses(projObj, memObj, epicObj, numEpicCodes);

          mockBackEnd(mockHttpResponses, mockBackend);

          expectedHttpResponse = [];

          projectService.getByCode(projcode).subscribe(
            project => {
              expect(project.collections.authorizations.env.length).toBe(1);
            }
          );
        }));
      });
      describe('given parentType is Compliance and Enforcement', () => {
        it('adds the collection under compliance',
          inject([ProjectService, HttpXhrBackend], (projectService, mockBackend) => {

          projcode = '';
          numEpicCodes = 1;

          const epicProjectCodes = epicProjectCodesFactory(numEpicCodes);
          const projObj = projectFactory(epicProjectCodes);
          const memObj = [];
          const epicObj = [collectionFactory('Compliance and Enforcement', false, false)];

          mockHttpResponses = createGetByCodeMockHttpResponses(projObj, memObj, epicObj, numEpicCodes);

          mockBackEnd(mockHttpResponses, mockBackend);

          expectedHttpResponse = [];

          projectService.getByCode(projcode).subscribe(
            project => {
              expect(project.collections.compliance.length).toBe(1);
            }
          );
        }));
        describe('given parentType is Other', () => {
          it('adds the collection under documents',
            inject([ProjectService, HttpXhrBackend], (projectService, mockBackend) => {

            projcode = '';
            numEpicCodes = 1;

            const epicProjectCodes = epicProjectCodesFactory(numEpicCodes);
            const projObj = projectFactory(epicProjectCodes);
            const memObj = [];
            const epicObj = [collectionFactory('Other', false, false)];

            mockHttpResponses = createGetByCodeMockHttpResponses(projObj, memObj, epicObj, numEpicCodes);

            mockBackEnd(mockHttpResponses, mockBackend);

            expectedHttpResponse = [];

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
});*/

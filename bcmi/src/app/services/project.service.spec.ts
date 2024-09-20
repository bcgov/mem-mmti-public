import {TestBed } from '@angular/core/testing';

import { ProjectService } from '@services/project.service';
import { HttpClientModule } from '@angular/common/http';

import { Api } from '@services/api';

describe('ProjectService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        Api,
        ProjectService
      ]
    });
  });

  it('Project Service needs tests written', () => {
    expect(true).toBeTruthy();
  });
});


// Tests fail on some seeds, suggesting order of tests is changing
// expected results. Will need to rebuild all tests that rely on
// data from previously run tests.

/*import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule, HttpResponse } from '@angular/common/http';

import { ProjectService } from '@services/project.service';
import { Api } from '@services/api';

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

  function createHttpResponseItem(resp: any) {
    HttpResponseItem = {
      HttpResponse: resp
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

  function mockBackEnd(mockHttpResponses: any[]) {
      // Have connection send a HttpResponse
      let mockResponse = new HttpResponse({
        body: JSON.stringify(mockHttpResponses)
      });

      return mockResponse;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        Api,
        ProjectService
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
        inject([ProjectService], (projectService) => {

        mockBackEnd(mockHttpResponses);

        projectService.getAll().subscribe(
          project => {
            expect(project.length).toBe(0);
          }
        );
      }));

      it('returns an empty array',
        inject([ProjectService], (projectService) => {

        mockBackEnd(mockHttpResponses);

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
        inject([ProjectService], (projectService) => {

        const projectObjs = [];
        mockHttpResponses = createGetAllMockHttpResponses(projectObjs);

        mockBackEnd(mockHttpResponses);

        projectService.getAll().subscribe(
          project => {
            expect(project.length).toBe(0);
          }
        );
      }));
      it('returns 2 items',
        inject([ProjectService], (projectService) => {

        const projectObjs = [
          projectFactory(),
          projectFactory()
        ];
        mockHttpResponses = createGetAllMockHttpResponses(projectObjs);

        mockBackEnd(mockHttpResponses);

        projectService.getAll().subscribe(
          project => {
            expect(project.length).toBe(2);
          }
        );
      }));
      it('returns n items',
        inject([ProjectService], (projectService) => {


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

        mockBackEnd(mockHttpResponses);

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
    let numEpicCodes;

    describe('given a valid HttpResponse', () => {
      it('returns an empty project',
        inject([ProjectService], (projectService) => {

        projcode = '';
        numEpicCodes = 0;

        const epicProjectCodes = epicProjectCodesFactory(numEpicCodes);
        const projObj = projectFactory(epicProjectCodes);
        const memObj = [collectionFactory('Authorizations', false, false)];
        const epicObj = [collectionFactory('Authorizations', false, false)];

        mockHttpResponses = createGetByCodeMockHttpResponses(projObj, memObj, epicObj, numEpicCodes);

        mockBackEnd(mockHttpResponses);

        projectService.getByCode(projcode).subscribe(
          project => {
            expect(project.code).toBe(null);
          }
        );
      }));

      it('returns the project corresponding to the code',
        inject([ProjectService], (projectService) => {

        projcode = '1234';
        numEpicCodes = 3;

        const epicProjectCodes = epicProjectCodesFactory(numEpicCodes);
        const projObj = projectFactory(epicProjectCodes);
        const memObj = [collectionFactory('Compliance and Enforcement', false, false)];
        const epicObj = [collectionFactory('Other', false, false)];

        mockHttpResponses = createGetByCodeMockHttpResponses(projObj, memObj, epicObj, numEpicCodes);

        mockBackEnd(mockHttpResponses);

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
    let numEpicCodes;

    describe('given a valid HttpResponse', () => {
      it('returns 0 collection',
        inject([ProjectService], (projectService) => {

        projcode = '';
        numEpicCodes = 0;

        const epicProjectCodes = epicProjectCodesFactory(numEpicCodes);
        const projObj = projectFactory(epicProjectCodes);
        const memObj = [];
        const epicObj = [];

        mockHttpResponses = createGetByCodeMockHttpResponses(projObj, memObj, epicObj, numEpicCodes);

        mockBackEnd(mockHttpResponses);

        projectService.getByCode(projcode).subscribe(
          project => {
            expect(project.collections.authorizations.mem.length).toBe(0);
          }
        );
      }));

      it('returns 1 collection',
        inject([ProjectService], (projectService) => {

        projcode = '';
        numEpicCodes = 0;

        const epicProjectCodes = epicProjectCodesFactory(numEpicCodes);
        const projObj = projectFactory(epicProjectCodes);
        const memObj = [collectionFactory('Authorizations', true, false)];
        const epicObj = [];

        mockHttpResponses = createGetByCodeMockHttpResponses(projObj, memObj, epicObj, numEpicCodes);

        mockBackEnd(mockHttpResponses);

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
    let numEpicCodes;

    describe('given a valid HttpResponse', () => {
      it('returns 0 collection',
        inject([ProjectService], (projectService) => {

        projcode = '';
        numEpicCodes = 0;

        const epicProjectCodes = epicProjectCodesFactory(numEpicCodes);
        const projObj = projectFactory(epicProjectCodes);
        const memObj = [];
        const epicObj = [];

        mockHttpResponses = createGetByCodeMockHttpResponses(projObj, memObj, epicObj, numEpicCodes);

        mockBackEnd(mockHttpResponses);

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
        inject([ProjectService], (projectService) => {

        projcode = '';
        numEpicCodes = 1;

        const epicProjectCodes = epicProjectCodesFactory(numEpicCodes);
        const projObj = projectFactory(epicProjectCodes);
        const memObj = [];
        const epicObj = [collectionFactory('Authorizations', false, false)];

        mockHttpResponses = createGetByCodeMockHttpResponses(projObj, memObj, epicObj, numEpicCodes);

        mockBackEnd(mockHttpResponses);

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
    let numEpicCodes;

    describe('given a valid HttpResponse', () => {
      describe('given parentType is Authorizations', () => {
        it('adds the collection to the eao agency in under authorizations',
          inject([ProjectService], (projectService) => {

          projcode = '';
          numEpicCodes = 1;

          const epicProjectCodes = epicProjectCodesFactory(numEpicCodes);
          const projObj = projectFactory(epicProjectCodes);
          const memObj = [];
          const epicObj = [collectionFactory('Authorizations', false, false)];

          mockHttpResponses = createGetByCodeMockHttpResponses(projObj, memObj, epicObj, numEpicCodes);

          mockBackEnd(mockHttpResponses);

          projectService.getByCode(projcode).subscribe(
            project => {
              expect(project.collections.authorizations.eao.length).toBe(1);
            }
          );
        }));
        it('adds the collection to the mem agency in under authorizations',
          inject([ProjectService], (projectService) => {

          projcode = '';
          numEpicCodes = 1;

          const epicProjectCodes = epicProjectCodesFactory(numEpicCodes);
          const projObj = projectFactory(epicProjectCodes);
          const memObj = [];
          const epicObj = [collectionFactory('Authorizations', true, false)];

          mockHttpResponses = createGetByCodeMockHttpResponses(projObj, memObj, epicObj, numEpicCodes);

          mockBackEnd(mockHttpResponses);

          projectService.getByCode(projcode).subscribe(
            project => {
              expect(project.collections.authorizations.mem.length).toBe(1);
            }
          );
        }));
        it('adds the collection to the env agency in under authorizations',
          inject([ProjectService], (projectService) => {

          projcode = '';
          numEpicCodes = 1;

          const epicProjectCodes = epicProjectCodesFactory(numEpicCodes);
          const projObj = projectFactory(epicProjectCodes);
          const memObj = [];
          const epicObj = [collectionFactory('Authorizations', false, true)];

          mockHttpResponses = createGetByCodeMockHttpResponses(projObj, memObj, epicObj, numEpicCodes);

          mockBackEnd(mockHttpResponses);

          projectService.getByCode(projcode).subscribe(
            project => {
              expect(project.collections.authorizations.env.length).toBe(1);
            }
          );
        }));
      });
      describe('given parentType is Compliance and Enforcement', () => {
        it('adds the collection under compliance',
          inject([ProjectService], (projectService) => {

          projcode = '';
          numEpicCodes = 1;

          const epicProjectCodes = epicProjectCodesFactory(numEpicCodes);
          const projObj = projectFactory(epicProjectCodes);
          const memObj = [];
          const epicObj = [collectionFactory('Compliance and Enforcement', false, false)];

          mockHttpResponses = createGetByCodeMockHttpResponses(projObj, memObj, epicObj, numEpicCodes);

          mockBackEnd(mockHttpResponses);

          projectService.getByCode(projcode).subscribe(
            project => {
              expect(project.collections.compliance.length).toBe(1);
            }
          );
        }));
        describe('given parentType is Other', () => {
          it('adds the collection under documents',
            inject([ProjectService], (projectService) => {

            projcode = '';
            numEpicCodes = 1;

            const epicProjectCodes = epicProjectCodesFactory(numEpicCodes);
            const projObj = projectFactory(epicProjectCodes);
            const memObj = [];
            const epicObj = [collectionFactory('Other', false, false)];

            mockHttpResponses = createGetByCodeMockHttpResponses(projObj, memObj, epicObj, numEpicCodes);

            mockBackEnd(mockHttpResponses);

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

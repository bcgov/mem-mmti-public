/*import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule, HttpResponse, HttpXhrBackend } from '@angular/common/http';
import { MockBackend } from '@angular/http/testing';

import { ProponentService } from './proponent.service';
import { Api } from './api';

describe('ProponentService', () => {
  let proponentItem;

  function createProponentItem(id: string) {
    return proponentItem = {
      _id: id
    };
  }

  function mockBackEnd(mockHttpResponse: any[], mockBackend: any) {
    // Subscribe to opened http connections
    mockBackend.connections.subscribe((connection) => {
      // Have connection send a HttpResponse
      connection.mockRespond(new HttpResponse({
        body: JSON.stringify(mockHttpResponse)
      }));
    });
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProponentService,
        Api,
        { provide: HttpXhrBackend, useClass: MockBackend }
      ],
      imports: [
        HttpClientModule
      ]
    });
  });

  describe('getAll()', () => {
    describe('given an invalid HttpResponse', () => {
      let mockHttpResponse;

      it('returns 0 items',
        inject([ProponentService, HttpXhrBackend], (proponentService, mockBackend) => {

          mockHttpResponse = undefined;

          mockBackEnd(mockHttpResponse, mockBackend);

          proponentService.getAll().subscribe(
            proponent => {
              expect(proponent.length).toBe(0);
            }
          );
      }));
      it('returns an empty array',
        inject([ProponentService, HttpXhrBackend], (proponentService, mockBackend) => {

          mockHttpResponse = undefined;

          mockBackEnd(mockHttpResponse, mockBackend);

          proponentService.getAll().subscribe(
            proponent => {
              expect(JSON.stringify(proponent)).toBe(JSON.stringify([]));
            }
          );
      }));
    });
    describe('given a valid HttpResponse', () => {
      let mockHttpResponse;

      it('returns 0 items',
        inject([ProponentService, HttpXhrBackend], (proponentService, mockBackend) => {

          mockHttpResponse = [];

          mockBackEnd(mockHttpResponse, mockBackend);

          proponentService.getAll().subscribe(
            proponent => {
              expect(proponent.length).toBe(0);
            }
          );
      }));
      it('returns 2 items',
        inject([ProponentService, HttpXhrBackend], (proponentService, mockBackend) => {

          mockHttpResponse = [
            createProponentItem('1234'),
            createProponentItem('4321')
          ];

          mockBackEnd(mockHttpResponse, mockBackend);

          proponentService.getAll().subscribe(
            proponent => {
              expect(proponent.length).toBe(2);
            }
          );
      }));
      it('returns n items',
        inject([ProponentService, HttpXhrBackend], (proponentService, mockBackend) => {

          mockHttpResponse = [
            createProponentItem('1234'),
            createProponentItem('1234'),
            createProponentItem('1234'),
            createProponentItem('1234'),
            createProponentItem('1234'),
            createProponentItem('1234'),
            createProponentItem('1234'),
            createProponentItem('4321')
          ];

          mockBackEnd(mockHttpResponse, mockBackend);

          proponentService.getAll().subscribe(
            proponent => {
              expect(proponent.length).toBe(8);
            }
          );
      }));
    });
  });
});*/

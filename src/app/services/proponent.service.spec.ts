import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http, Response, ResponseOptions, BaseRequestOptions, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { ProponentService } from './proponent.service';
import { Api } from './api';

import { Observable } from 'rxjs/Rx';

describe('ProponentService', () => {
  let proponentItem;

  function createProponentItem(id: string) {
    return proponentItem = {
      _id: id
    };
  }

  function mockBackEnd(mockResponse: any[], mockBackend: any) {
    // Subscribe to opened http connections
    mockBackend.connections.subscribe((connection) => {
      // Have connection send a response
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProponentService,
        Api,
        { provide: XHRBackend, useClass: MockBackend }
      ],
      imports: [
        HttpModule
      ]
    });
  });

  describe('getAll()', () => {
    describe('given an invalid response', () => {
      let mockResponse;

      it('returns 0 items',
        inject([ProponentService, XHRBackend], (proponentService, mockBackend) => {

          mockResponse = undefined;

          mockBackEnd(mockResponse, mockBackend);

          proponentService.getAll().subscribe(
            proponent => {
              expect(proponent.length).toBe(0);
            }
          );
      }));
      it('returns an empty array',
        inject([ProponentService, XHRBackend], (proponentService, mockBackend) => {

          mockResponse = undefined;

          mockBackEnd(mockResponse, mockBackend);

          proponentService.getAll().subscribe(
            proponent => {
              expect(JSON.stringify(proponent)).toBe(JSON.stringify([]));
            }
          );
      }));
    });
    describe('given a valid response', () => {
      let mockResponse;

      it('returns 0 items',
        inject([ProponentService, XHRBackend], (proponentService, mockBackend) => {

          mockResponse = [];

          mockBackEnd(mockResponse, mockBackend);

          proponentService.getAll().subscribe(
            proponent => {
              expect(proponent.length).toBe(0);
            }
          );
      }));
      it('returns 2 items',
        inject([ProponentService, XHRBackend], (proponentService, mockBackend) => {

          mockResponse = [
            createProponentItem('1234'),
            createProponentItem('4321')
          ];

          mockBackEnd(mockResponse, mockBackend);

          proponentService.getAll().subscribe(
            proponent => {
              expect(proponent.length).toBe(2);
            }
          );
      }));
      it('returns n items',
        inject([ProponentService, XHRBackend], (proponentService, mockBackend) => {

          mockResponse = [
            createProponentItem('1234'),
            createProponentItem('1234'),
            createProponentItem('1234'),
            createProponentItem('1234'),
            createProponentItem('1234'),
            createProponentItem('1234'),
            createProponentItem('1234'),
            createProponentItem('4321')
          ];

          mockBackEnd(mockResponse, mockBackend);

          proponentService.getAll().subscribe(
            proponent => {
              expect(proponent.length).toBe(8);
            }
          );
      }));
    });
  });
});

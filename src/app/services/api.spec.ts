import { TestBed, inject } from '@angular/core/testing';
import { Api } from './api';
import { Http, HttpModule } from '@angular/http';

describe('Api', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Api
      ],
      declarations: [],
      imports: [
        HttpModule
      ]
    });
  });

  it('should be created', inject([Api], (service: Api) => {
    expect(service).toBeTruthy();
  }));
});

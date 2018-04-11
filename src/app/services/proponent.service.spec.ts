import { TestBed, inject } from '@angular/core/testing';
import { ProponentService } from './proponent.service';
import { Api } from './api';
import { Http, HttpModule } from '@angular/http';

describe('ProponentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProponentService,
        Api
      ],
      declarations: [],
      imports: [
        HttpModule
      ]
    });
  });

  it('should be created', inject([ProponentService], (service: ProponentService) => {
    expect(service).toBeTruthy();
  }));
});

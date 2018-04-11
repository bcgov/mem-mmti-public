import { TestBed, inject } from '@angular/core/testing';
import { ProjectService } from './project.service';
import { Api } from './api';
import { Http, HttpModule } from '@angular/http';

describe('ProjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProjectService,
        Api
      ],
      declarations: [],
      imports: [
        HttpModule
      ]
    });
  });

  it('should be created', inject([ProjectService], (service: ProjectService) => {
    expect(service).toBeTruthy();
  }));
});

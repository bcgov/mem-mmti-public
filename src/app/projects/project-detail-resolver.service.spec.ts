import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ProjectDetailResolver } from './project-detail-resolver.service';
import { ProjectService } from 'app/services/project.service';
import { Api } from 'app/services/api';
import { Http, HttpModule } from '@angular/http';

describe('ProjectDetailResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProjectService,
        ProjectDetailResolver,
        Api
      ],
      declarations: [],
      imports: [
        HttpModule,
        RouterTestingModule
      ]
    });
  });

  it('should be created', inject([ProjectDetailResolver], (service: ProjectDetailResolver) => {
    expect(service).toBeTruthy();
  }));
});

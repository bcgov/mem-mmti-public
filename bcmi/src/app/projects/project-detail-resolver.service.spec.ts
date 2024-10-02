import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ProjectDetailResolver } from '@projects/project-detail-resolver.service';
import { ProjectService } from '@services/project.service';
import { Api } from '@services/api';
import { ConfigService } from '@services/config.service';
import { HttpClientModule } from '@angular/common/http';
import { ContentService } from '@app/services/content-service';
import { Apollo } from 'apollo-angular';

describe('ProjectDetailResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProjectService,
        ProjectDetailResolver,
        Api,
        ConfigService,
        ContentService,
        Apollo
      ],
      declarations: [],
      imports: [
        HttpClientModule,
        RouterTestingModule
      ]
    });
  });

  it('should be created', inject([ProjectDetailResolver], (service: ProjectDetailResolver) => {
    expect(service).toBeTruthy();
  }));
});

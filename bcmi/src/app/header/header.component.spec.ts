import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProjectService } from '@services/project.service';
import { ConfigService } from '@services/config.service';
import { Api } from '@services/api';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '../header/header.component';
import { Project } from '@models/project';
import { ContentService } from '@app/services/content-service';
import { Apollo } from 'apollo-angular';

window.scrollTo = jest.fn();

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let ProjectServiceStub;

  beforeEach(waitForAsync(() => {
    // stub project service
    ProjectServiceStub = {
      getAll: jest.fn().mockReturnValue({
        subscribe: function(fn) {
          fn(Array<Project>());
        }
      })
    };
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [{ provide: ProjectService, useValue: ProjectServiceStub }, Api, ConfigService, ContentService, Apollo],
      imports: [RouterTestingModule, HttpClientModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
  });
  describe('ngOnInit()', () => {
    it('should call projectService.getAll()', () => {
      expect(ProjectServiceStub.getAll).toHaveBeenCalled();
    });
  });
});

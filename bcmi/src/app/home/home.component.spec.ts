import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProjectService } from '@services/project.service';
import { ConfigService } from '@services/config.service';
import { Api } from '@services/api';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from '../home/home.component';
import { Project } from '@models/project';
import { ContentService } from '@app/services/content-service';
import { Apollo } from 'apollo-angular';

window.scrollTo = jest.fn();

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
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
      declarations: [HomeComponent],
      providers: [{ provide: ProjectService, useValue: ProjectServiceStub }, Api, ConfigService, ContentService, Apollo],
      imports: [RouterTestingModule, HttpClientModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
  });
  describe('ngOnInit()', () => {
    it('should call projectService.getAll()', () => {
      expect(ProjectServiceStub.getAll).toHaveBeenCalled();
    });
  });
});

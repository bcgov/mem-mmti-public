import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProjectService } from '@services/project.service';
import { ConfigService } from '@services/config.service';
import { Api } from '@services/api';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from '../footer/footer.component';
import { Project } from '@models/project';
import { ContentService } from '@app/services/content-service';
import { Apollo } from 'apollo-angular';

window.scrollTo = jest.fn();

describe('FooterComponent', () => {
  let fixture: ComponentFixture<FooterComponent>;
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
      declarations: [FooterComponent],
      providers: [{ provide: ProjectService, useValue: ProjectServiceStub }, Api, ConfigService, ContentService, Apollo],
      imports: [RouterTestingModule, HttpClientModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();
  });
  describe('ngOnInit()', () => {
    it('should call projectService.getAll()', () => {
      expect(ProjectServiceStub.getAll).toHaveBeenCalled();
    });
  });
});

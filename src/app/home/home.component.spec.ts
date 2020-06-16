import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProjectService } from 'app/services/project.service';
import { Api } from 'app/services/api';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from 'app/home/home.component';
import { Project } from 'app/models/project';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let ProjectServiceStub;

  beforeEach(async(() => {
    // stub project service
    ProjectServiceStub = {
      getAll: jasmine.createSpy().and.returnValue({
        subscribe: function(fn) {
          fn(Array<Project>());
        }
      })
    };
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [{ provide: ProjectService, useValue: ProjectServiceStub }, Api],
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

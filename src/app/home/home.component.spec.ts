import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProjectService } from '../services/project.service';
import { Api } from '../services/api';
import { Http, HttpModule } from '@angular/http';
import { HomeComponent } from './home.component';
import { Project } from '../models/project';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let ProjectServiceStub;

  beforeEach(async(() => {
    // stub project service
    ProjectServiceStub = {
      getAll: function() {
        return {
          subscribe: function(fn) {
            fn(Array<Project>());
          }
        };
      }
    };
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers: [
        {provide: ProjectService, useValue: ProjectServiceStub},
        Api
      ],
      imports: [ RouterTestingModule, HttpModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  describe('ngOnInit()', () => {
    it('should call projectService.getAll()', () => {
      expect(ProjectServiceStub.getAll()).toHaveBeenCalled;
    });
    it('should return results data', () => {
      expect('component.results').toBeTruthy;
    });
  });
});

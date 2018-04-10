import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProjectService } from '../services/project.service';
import { Api } from '../services/api';
import { Http, HttpModule } from '@angular/http';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let ProjectServiceStub;

  beforeEach(async(() => {
    // stub project service
    ProjectServiceStub = {
      getAll: () => {
        return jasmine.createSpyObj('Subscription', ['subscribe']);
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

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Project } from '../../models/project';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Http, HttpModule } from '@angular/http';

import { ProjectListComponent } from './project-list.component';
import { OrderByPipe } from '../../filters/order-by.pipe';
import { ProjectStatusFilterPipe } from '../../project-status-filter.pipe';
import { ProjectTypeFilterPipe } from '../../project-type-filter.pipe';
import { OperatorFilterPipe } from '../../operator-filter.pipe';
import { ObjectFilterPipe } from '../../object-filter.pipe';
import { ProjectService } from 'app/services/project.service';
import { Api } from 'app/services/api';
import { Observable } from 'rxjs/Observable';

describe('ProjectComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;
  let ProjectServiceStub;

  beforeEach(async(() => {
    // stub project service
    ProjectServiceStub = {
      getAll: () => {
        return jasmine.createSpyObj('Subscription', ['subscribe']);
      }
    };
    TestBed.configureTestingModule({
      providers: [
        {provide: ProjectService, useValue: ProjectServiceStub},
        Api
      ],
      declarations: [
        ProjectListComponent,
        OrderByPipe,
        ProjectStatusFilterPipe,
        ProjectTypeFilterPipe,
        OperatorFilterPipe,
        ObjectFilterPipe
      ],
      imports: [
        RouterTestingModule,
        NgxPaginationModule,
        FormsModule,
        HttpModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Project } from '../../models/project';
import { MapModule } from '../../map/map.module';
import { Http, HttpModule } from '@angular/http';
import { ProjectDetailComponent } from './project-detail.component';

import { OrderByPipe } from '../../filters/order-by.pipe';
import { SiteActivitiesComponent } from '../site-activities/site-activities.component';
import { Api } from 'app/services/api';

describe('ProjectDetailComponent', () => {
  let component: ProjectDetailComponent;
  let fixture: ComponentFixture<ProjectDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        Api
      ],
      declarations: [
        ProjectDetailComponent,
        OrderByPipe,
        SiteActivitiesComponent
      ],
      imports: [
        RouterTestingModule,
        MapModule,
        HttpModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDetailComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    spyOn(component, 'parseData').and.stub;
    component.project = new Project();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});

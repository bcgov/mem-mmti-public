import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Http, HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { SiteActivitiesComponent } from '../../site-activities/site-activities.component';
import { Component, Input } from '@angular/core';

import { AuthorizationsTabContentComponent } from './authorizations-tab-content.component';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../../models/project';

import { OrderByPipe } from '../../../filters/order-by.pipe';

import { MapModule } from '../../../map/map.module';
import { CollectionsArray } from 'app/models/collection';

describe('AuthorizationsTabContentComponent', () => {
  let component: AuthorizationsTabContentComponent;
  let fixture: ComponentFixture<AuthorizationsTabContentComponent>;
  let ActivatedRouteStub;

  beforeEach(async(() => {
    // stub activated route
    ActivatedRouteStub = {
      parent: {
        data: {
          subscribe: (next: (value) => void) => {
            next({project: Project});
            return jasmine.createSpyObj('Subscription', ['unsubscribe']);
          }
        }
      }
    };
    TestBed.configureTestingModule({
      providers: [
        { provide: ActivatedRoute, useValue: ActivatedRouteStub }
      ],
      declarations: [
        AuthorizationsTabContentComponent,
        OrderByPipe,
        SiteActivitiesComponent
      ],
      imports: [
        RouterTestingModule,
        HttpModule,
        MapModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizationsTabContentComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    spyOn(component, 'parseData').and.stub;
    component.collections = {
      sort: () => {},
      eao: new CollectionsArray(),
      env: new CollectionsArray(),
      mem: new CollectionsArray()
    };
    component.project = new Project({morePermitsLink: null});
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});

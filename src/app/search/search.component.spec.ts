import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DocumentService } from '../services/document.service';
import { Http, HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

import { SearchComponent } from './search.component';
import { Api } from 'app/services/api';
import { ProjectService } from 'app/services/project.service';
import { ProponentService } from 'app/services/proponent.service';
import { Project } from '../models/project';
import { Proponent } from '../models/proponent';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let ProponentServiceStub;

  beforeEach(async(() => {
    // stub proponent service
    ProponentServiceStub = {
      getAll: () => {
        return jasmine.createSpyObj('Subscription', ['subscribe']);
      }
    };
    TestBed.configureTestingModule({
      providers: [
        DocumentService,
        Api,
        ProjectService,
        {provide: ProponentService, useValue: ProponentServiceStub}
      ],
      declarations: [
        SearchComponent
      ],
      imports: [
        FormsModule,
        NgbModule.forRoot(),
        HttpModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('clear fields', () => {
    let project: Project;
    let proponent: Proponent;

    beforeEach(() => {
      project = new Project();
      proponent = new Proponent();

      component.terms.keywords = 'some search keywords';
      component.terms.projects = [project];
      component.terms.proponents = [proponent];
      component.terms.ownerships = [proponent];
      component.terms.dateStart = { day: 1, month: 2, year: 3 };
      component.terms.dateEnd = { day: 4, month: 5, year: 6 };
    });

    describe('clearKeywords()', () => {
      it('clears the keywords field', () => {
        component.clearKeywords();

        expect(component.terms.keywords).toEqual('');
        expect(component.terms.projects).toEqual([project]);
        expect(component.terms.proponents).toEqual([proponent]);
        expect(component.terms.ownerships).toEqual([proponent]);
        expect(component.terms.dateStart).toEqual({ day: 1, month: 2, year: 3 });
        expect(component.terms.dateEnd).toEqual({ day: 4, month: 5, year: 6 });
      });
    });

    describe('clearDateStart()', () => {
      it('clears the dateStart field', () => {
        component.clearDateStart();

        expect(component.terms.keywords).toEqual('some search keywords');
        expect(component.terms.projects).toEqual([project]);
        expect(component.terms.proponents).toEqual([proponent]);
        expect(component.terms.ownerships).toEqual([proponent]);
        expect(component.terms.dateStart).toEqual(null);
        expect(component.terms.dateEnd).toEqual({ day: 4, month: 5, year: 6 });
      });
    });

    describe('cleartDateEnd', () => {
      it('clears the dateEnd field', () => {
        component.clearDateEnd();

        expect(component.terms.keywords).toEqual('some search keywords');
        expect(component.terms.projects).toEqual([project]);
        expect(component.terms.proponents).toEqual([proponent]);
        expect(component.terms.ownerships).toEqual([proponent]);
        expect(component.terms.dateStart).toEqual({ day: 1, month: 2, year: 3 });
        expect(component.terms.dateEnd).toEqual(null);
      });
    });
  });
});

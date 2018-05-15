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

  describe('clearTerms()', () => {
    it('clears the search fields', () => {
      expect(component.terms.keywords).toEqual('');
      expect(component.terms.projects).toEqual([]);
      expect(component.terms.proponents).toEqual([]);
      expect(component.terms.ownerships).toEqual([]);
      expect(component.terms.dateStart).toEqual(null);
      expect(component.terms.dateEnd).toEqual(null);

      const project = new Project();
      const proponent = new Proponent();

      component.terms.keywords = 'some search keywords';
      component.terms.projects = [project];
      component.terms.proponents = [proponent];
      component.terms.ownerships = [proponent];
      component.terms.dateStart = { day: null, month: null, year: null };
      component.terms.dateEnd = { day: null, month: null, year: null };

      expect(component.terms.keywords).toEqual('some search keywords');
      expect(component.terms.projects).toEqual([project]);
      expect(component.terms.proponents).toEqual([proponent]);
      expect(component.terms.ownerships).toEqual([proponent]);
      expect(component.terms.dateStart).toEqual({ day: null, month: null, year: null });
      expect(component.terms.dateEnd).toEqual({ day: null, month: null, year: null });

      component.clearTerms();
      fixture.detectChanges();

      expect(component.terms.keywords).toEqual('');
      expect(component.terms.projects).toEqual([]);
      expect(component.terms.proponents).toEqual([]);
      expect(component.terms.ownerships).toEqual([]);
      expect(component.terms.dateStart).toEqual(null);
      expect(component.terms.dateEnd).toEqual(null);
    });
  });
});

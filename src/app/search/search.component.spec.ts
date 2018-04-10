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
});

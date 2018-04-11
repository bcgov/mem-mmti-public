import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../../models/project';
import { CollectionsArray } from 'app/models/collection';

import { DocumentsTabContentComponent } from './documents-tab-content.component';

describe('DocumentsTabContentComponent', () => {
  let component: DocumentsTabContentComponent;
  let fixture: ComponentFixture<DocumentsTabContentComponent>;
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
      declarations: [ DocumentsTabContentComponent ],
      imports: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsTabContentComponent);
    component = fixture.componentInstance;
    component.collections = new CollectionsArray();
  });

  it('should be created', () => {
    spyOn(component, 'parseData').and.stub;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});

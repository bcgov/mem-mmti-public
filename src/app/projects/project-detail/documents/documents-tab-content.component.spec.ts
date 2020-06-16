import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'app/models/project';
import { CollectionsArray, CollectionsList } from 'app/models/collection';

import { DocumentsTabContentComponent } from 'app/projects/project-detail/documents/documents-tab-content.component';

describe('DocumentsTabContentComponent', () => {
  let component: DocumentsTabContentComponent;
  let fixture: ComponentFixture<DocumentsTabContentComponent>;
  let ActivatedRouteStub;
  const project: Project = new Project({ collections: { documents: { sort: () => {} } } });

  beforeEach(async(() => {
    // stub activated route
    ActivatedRouteStub = {
      parent: {
        data: {
          subscribe: (next: (value) => void) => {
            next({project});
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
  describe('ngOnInit()', () => {
    beforeEach(() => {
      component.ngOnInit();
    });
    it('should return project data', () => {
      expect(component.project).toBeTruthy();
    });
  });
  describe('parseData(data)', () => {
    beforeEach(() => {
      const data = { project: new Project() };
      data.project.collections = new CollectionsList();
      component.parseData(data);
    });
    it('should return data for this.project', () => {
      expect(component.project).toBeTruthy();
    });
    it('should return data for this.project.collections', () => {
      expect(component.project.collections).toBeTruthy();
    });
  });
});

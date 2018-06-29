import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { Router, NavigationEnd } from '@angular/router';

import { AuthorizationsComponent } from './authorizations.component';

describe('AuthorizationsComponent', () => {
  let component: AuthorizationsComponent;
  let fixture: ComponentFixture<AuthorizationsComponent>;
  let navigationInstance;
  const routerStub = {
    events: {
      subscribe: (next: (value) => void) => {
        next(navigationInstance);
        return jasmine.createSpyObj('Subscription', ['unsubscribe']);
      }
    },
    parseUrl: (url) => {
      return {
        fragment: 'test'
      };
    },
    url: 'test.test.com'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerStub }
      ],
      declarations: [ AuthorizationsComponent ],
      imports: [
        NgxPageScrollModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizationsComponent);
    component = fixture.componentInstance;
  });

  it('should be created', inject([Router], (router) => {
    navigationInstance = new NavigationEnd(1, 'test.test.com', 'test.test.com');
    new AuthorizationsComponent(router);
    expect(component).toBeTruthy();
  }));
});

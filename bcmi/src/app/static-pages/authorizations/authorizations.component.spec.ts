import { waitForAsync, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { Router, NavigationEnd } from '@angular/router';

import { AuthorizationsComponent } from './authorizations.component';
import { Subscription } from 'rxjs';

window.scrollTo = jest.fn();

describe('AuthorizationsComponent', () => {
  let component: AuthorizationsComponent;
  let fixture: ComponentFixture<AuthorizationsComponent>;
  let navigationInstance: NavigationEnd;
  const routerStub = {
    events: {
      subscribe: (next: (value: any) => void) => {
        next(navigationInstance);
        const sub = new Subscription();
        sub.unsubscribe = jest.fn();
        return sub;
      }
    },
    parseUrl: () => {
      return {
        fragment: 'test'
      };
    },
    url: 'test.test.com'
  };

  beforeEach(waitForAsync(() => {
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

  it('should be created', inject([Router], (router: Router) => {
    navigationInstance = new NavigationEnd(1, 'test.test.com', 'test.test.com');
    const authComp = new AuthorizationsComponent(router);
    expect(authComp).not.toBeNull();
    expect(component).toBeTruthy();
  }));
});

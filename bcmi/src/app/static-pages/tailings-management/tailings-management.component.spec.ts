import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { RouterTestingModule } from '@angular/router/testing';

import { TailingsManagementComponent } from './tailings-management.component';

window.scrollTo = jest.fn();

describe('TailingsManagementComponent', () => {
  let component: TailingsManagementComponent;
  let fixture: ComponentFixture<TailingsManagementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [],
      declarations: [
        TailingsManagementComponent
      ],
      imports: [
        NgxPageScrollModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TailingsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

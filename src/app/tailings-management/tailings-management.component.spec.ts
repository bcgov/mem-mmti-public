import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { RouterTestingModule } from '@angular/router/testing';

import { TailingsManagementComponent } from './tailings-management.component';

describe('TailingsManagementComponent', () => {
  let component: TailingsManagementComponent;
  let fixture: ComponentFixture<TailingsManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [],
      declarations: [
        TailingsManagementComponent
      ],
      imports: [
        Ng2PageScrollModule.forRoot(),
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

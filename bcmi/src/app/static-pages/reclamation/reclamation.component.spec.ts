import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { RouterTestingModule } from '@angular/router/testing';

import { ReclamationComponent } from './reclamation.component';

window.scrollTo = jest.fn();

describe('ReclamationComponent', () => {
  let component: ReclamationComponent;
  let fixture: ComponentFixture<ReclamationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [],
      declarations: [ ReclamationComponent ],
      imports: [
        NgxPageScrollModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReclamationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

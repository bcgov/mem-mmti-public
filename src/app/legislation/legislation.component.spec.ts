import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { RouterTestingModule } from '@angular/router/testing';

import { LegislationComponent } from './legislation.component';

describe('LegislationComponent', () => {
  let component: LegislationComponent;
  let fixture: ComponentFixture<LegislationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [],
      declarations: [ LegislationComponent ],
      imports: [
        Ng2PageScrollModule.forRoot(),
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegislationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

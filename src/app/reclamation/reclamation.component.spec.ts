import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { RouterTestingModule } from '@angular/router/testing';

import { ReclamationComponent } from './reclamation.component';

describe('ReclamationComponent', () => {
  let component: ReclamationComponent;
  let fixture: ComponentFixture<ReclamationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [],
      declarations: [ ReclamationComponent ],
      imports: [
        Ng2PageScrollModule.forRoot(),
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

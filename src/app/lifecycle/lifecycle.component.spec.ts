import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { RouterTestingModule } from '@angular/router/testing';

import { LifecycleComponent } from './lifecycle.component';

describe('LifecycleComponent', () => {
  let component: LifecycleComponent;
  let fixture: ComponentFixture<LifecycleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [],
      declarations: [ LifecycleComponent ],
      imports: [
        Ng2PageScrollModule.forRoot(),
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LifecycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

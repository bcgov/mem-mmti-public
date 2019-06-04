import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmprEaComponent } from './enforcement-actions.component';

describe('EmprEaComponent', () => {
  let component: EmprEaComponent;
  let fixture: ComponentFixture<EmprEaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmprEaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmprEaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

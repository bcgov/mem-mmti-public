import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { RouterTestingModule } from '@angular/router/testing';

import { WaterQualityComponent } from './water-quality.component';

describe('WaterQualityComponent', () => {
  let component: WaterQualityComponent;
  let fixture: ComponentFixture<WaterQualityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [],
      declarations: [
        WaterQualityComponent
      ],
      imports: [
        Ng2PageScrollModule.forRoot(),
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterQualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { RouterTestingModule } from '@angular/router/testing';

import { WaterQualityComponent } from './water-quality.component';

window.scrollTo = jest.fn();

describe('WaterQualityComponent', () => {
  let component: WaterQualityComponent;
  let fixture: ComponentFixture<WaterQualityComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [],
      declarations: [
        WaterQualityComponent
      ],
      imports: [
        NgxPageScrollModule,
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

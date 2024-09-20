import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { RouterTestingModule } from '@angular/router/testing';

import { TopicsOfInterestComponent } from './topics-of-interest.component';

window.scrollTo = jest.fn();

describe('TopicsOfInterestComponent', () => {
  let component: TopicsOfInterestComponent;
  let fixture: ComponentFixture<TopicsOfInterestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [],
      declarations: [
        TopicsOfInterestComponent
      ],
      imports: [
        NgxPageScrollModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicsOfInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteActivitiesComponent } from '@projects/site-activities/site-activities.component';

describe('SiteActivitiesComponent', () => {
  let component: SiteActivitiesComponent;
  let fixture: ComponentFixture<SiteActivitiesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteActivitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

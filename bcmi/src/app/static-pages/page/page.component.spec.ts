import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageComponent } from './page.component';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Page } from '@app/models/content/page';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

window.scrollTo = jest.fn();

describe('PageComponent', () => {
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;

  const pageData = new Page();
  pageData.Title = "Test";

  const fakeActivatedRoute = {data: of({pageData: [pageData]}) };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [{provide: ActivatedRoute, useValue: fakeActivatedRoute}],
      declarations: [PageComponent],
      imports: [CommonModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

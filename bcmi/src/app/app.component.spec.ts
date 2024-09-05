import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { CookieService } from 'ngx-cookie-service';
import { Api } from 'app/services/api';
import { ConfigService } from 'app/services/config.service';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from 'app/app.component';
import { SafeHtmlPipe } from 'app/pipes/safe-html.pipe';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        CookieService,
        Api,
        ConfigService
      ],
      declarations: [
        AppComponent,
        SafeHtmlPipe
      ],
      imports: [
        RouterTestingModule,
        NgxPageScrollModule,
        HttpClientModule
      ]
    }).compileComponents();
  }));

  it('should create the app', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});

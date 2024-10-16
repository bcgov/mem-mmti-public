import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { CookieService } from 'ngx-cookie-service';
import { Api } from '@services/api';
import { ConfigService } from '@services/config.service';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SafeHtmlPipe } from '@pipes/safe-html.pipe';
import { Apollo } from 'apollo-angular';
import { ContentService } from './services/content-service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        CookieService,
        Api,
        ConfigService,
        Apollo,
        ContentService
      ],
      declarations: [
        HeaderComponent,
        FooterComponent,
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

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app.routes';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent} from './footer/footer.component';
import { LegislationComponent } from './static-pages/legislation/legislation.component';
import { ComplianceOversightComponent } from './static-pages/compliance-oversight/compliance-oversight.component';
import { ContactComponent } from './static-pages/contact/contact.component';
import { AuthorizationsComponent } from './static-pages/authorizations/authorizations.component';
import { LifecycleComponent } from './static-pages/lifecycle/lifecycle.component';
import { TopicsOfInterestComponent } from './static-pages/topics-of-interest/topics-of-interest.component';
import { WaterQualityComponent } from './static-pages/water-quality/water-quality.component';
import { TailingsManagementComponent } from './static-pages/tailings-management/tailings-management.component';
import { ReclamationComponent } from './static-pages/reclamation/reclamation.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EnforcementActionsModule } from './enforcement-actions/enforcement-actions.module';
import { ProponentService } from '@services/proponent.service';
import { ConfigService } from '@services/config.service';
import { GeocoderService } from '@services/geocoder.service';
import { LoggerService } from '@services/logger.service';

// feature modules
import { MapModule } from './map/map.module';
import { ProjectsModule } from '@projects/projects.module';
import { SharedModule } from './shared/shared.module';

import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { GraphQLModule } from './graphql.module';
import { PageComponent } from './static-pages/page/page.component';
import { ContentService } from './services/content-service';
import { ContentDirective } from './services/content-directive';

export function initConfig(configService: ConfigService) {
  return () => configService.init();
}

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AppComponent,
    HomeComponent,
    LegislationComponent,
    ComplianceOversightComponent,
    ContactComponent,
    AuthorizationsComponent,
    PageComponent,
    LifecycleComponent,
    TopicsOfInterestComponent,
    WaterQualityComponent,
    TailingsManagementComponent,
    ReclamationComponent,
    NotFoundComponent,
    ContentDirective
  ],
  imports: [
    TagInputModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ProjectsModule, // <-- module import order matters - https://angular.io/guide/router#module-import-order-matters
    EnforcementActionsModule,
    AppRoutingModule,
    NgbModule,
    NgxPaginationModule,
    NgxPageScrollModule,
    NgxPageScrollCoreModule.forRoot({
      scrollOffset: 50,
      duration: 300,
      easingLogic: Easing
    }),
    MapModule,
    SharedModule,
    RouterModule,
    LeafletModule,
    GraphQLModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      multi: true,
      deps: [ConfigService,ContentService]
    },
    ProponentService,
    ContentService,
    CookieService,
    ConfigService,
    GeocoderService,
    LoggerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
export function Easing(t: number, b: number, c: number, d: number): number {
  // easeInOutExpo easing
  if (t === 0) {
    return b;
  }
  if (t === d) {
    return b + c;
  }
  if ((t /= d / 2) < 1) {
    return (c / 2) * Math.pow(2, 10 * (t - 1)) + b;
  }

  return (c / 2) * (-Math.pow(2, -10 * --t) + 2) + b;
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from 'app/app-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from 'app/app.component';
import { HomeComponent } from 'app/home/home.component';
import { LegislationComponent } from 'app/static-pages/legislation/legislation.component';
import { ComplianceOversightComponent } from 'app/static-pages/compliance-oversight/compliance-oversight.component';
import { ContactComponent } from 'app/static-pages/contact/contact.component';
import { AuthorizationsComponent } from 'app/static-pages/authorizations/authorizations.component';
import { LifecycleComponent } from 'app/static-pages/lifecycle/lifecycle.component';
import { TopicsOfInterestComponent } from 'app/static-pages/topics-of-interest/topics-of-interest.component';
import { WaterQualityComponent } from 'app/static-pages/water-quality/water-quality.component';
import { TailingsManagementComponent } from 'app/static-pages/tailings-management/tailings-management.component';
import { ReclamationComponent } from 'app/static-pages/reclamation/reclamation.component';
import { NotFoundComponent } from 'app/not-found/not-found.component';
import { ProponentService } from 'app/services/proponent.service';

// feature modules
import { MapModule } from 'app/map/map.module';
import { ProjectsModule } from 'app/projects/projects.module';
import { SharedModule } from 'app/shared/shared.module';

import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EnforcementActionsComponent } from 'app/static-pages/enforcement-actions/enforcement-actions.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LegislationComponent,
    ComplianceOversightComponent,
    ContactComponent,
    AuthorizationsComponent,
    LifecycleComponent,
    TopicsOfInterestComponent,
    WaterQualityComponent,
    TailingsManagementComponent,
    ReclamationComponent,
    NotFoundComponent,
    EnforcementActionsComponent,
  ],
  imports: [
    TagInputModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ProjectsModule,  // <-- module import order matters - https://angular.io/guide/router#module-import-order-matters
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
    SharedModule
  ],
  providers: [ProponentService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function Easing(t: number, b: number, c: number, d: number): number {
  // easeInOutExpo easing
  if (t === 0) {
    return b;
  }
  if (t === d) {
    return b + c;
  }
  if ((t /= d / 2) < 1) {
    return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
  }

  return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
}

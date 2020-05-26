import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LegislationComponent } from './legislation/legislation.component';
import { ComplianceOversightComponent } from './compliance-oversight/compliance-oversight.component';
import { ContactComponent } from './contact/contact.component';
import { AuthorizationsComponent } from './authorizations/authorizations.component';
import { LifecycleComponent } from './lifecycle/lifecycle.component';
import { TopicsOfInterestComponent } from './topics-of-interest/topics-of-interest.component';
import { WaterQualityComponent } from './water-quality/water-quality.component';
import { TailingsManagementComponent } from './tailings-management/tailings-management.component';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { SearchComponent } from './search/search.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProponentService } from './services/proponent.service';

// feature modules
import { MapModule } from './map/map.module';
import { ProjectsModule } from './projects/projects.module';
import { SharedModule } from 'app/shared/shared.module';

import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EnforcementActionsComponent } from './enforcement-actions/enforcement-actions.component';

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
    SearchComponent,
    NotFoundComponent,
    EnforcementActionsComponent,
  ],
  imports: [
    TagInputModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClient,
    HttpClientModule,
    ProjectsModule,  // <-- module import order matters - https://angular.io/guide/router#module-import-order-matters
    AppRoutingModule,
    NgbModule,
    NgxPaginationModule,
    NgxPageScrollModule,
    NgxPageScrollCoreModule.forRoot({
      scrollOffset: 50,
      duration: 300
    }),
    MapModule,
    SharedModule
  ],
  providers: [ProponentService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }

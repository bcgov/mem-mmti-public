import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2PageScrollModule } from 'ng2-page-scroll';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProjectComponent } from './project/project.component';
import { NewsComponent } from './news/news.component';
import { ObjectFilterPipe } from './object-filter.pipe';
import { LegislationComponent } from './legislation/legislation.component';
import { ProcessComponent } from './process/process.component';
import { ComplianceOversightComponent } from './compliance-oversight/compliance-oversight.component';
import { ContactComponent } from './contact/contact.component';
import { AuthorizationsComponent } from './authorizations/authorizations.component';
import { LifecycleComponent } from './lifecycle/lifecycle.component';
import { TopicsOfInterestComponent } from './topics-of-interest/topics-of-interest.component';
import { WaterQualityComponent } from './water-quality/water-quality.component';
import { TailingsManagementComponent } from './tailings-management/tailings-management.component';
import { ReclamationComponent } from './reclamation/reclamation.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProjectComponent,
    NewsComponent,
    ObjectFilterPipe,
    LegislationComponent,
    ProcessComponent,
    ComplianceOversightComponent,
    ContactComponent,
    AuthorizationsComponent,
    LifecycleComponent,
    TopicsOfInterestComponent,
    WaterQualityComponent,
    TailingsManagementComponent,
    ReclamationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NgbModule,
    NgxPaginationModule,
    Ng2PageScrollModule.forRoot()
  ],
  providers: [NewsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import {NgxPaginationModule} from 'ngx-pagination';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProjectComponent } from './project/project.component';
import { NewsComponent } from './news/news.component';
import { ObjectFilterPipe } from './object-filter.pipe';
import { LegislationComponent } from './legislation/legislation.component';
import { ProcessComponent } from './process/process.component';
import { ComplianceOversightComponent } from './compliance-oversight/compliance-oversight.component';
import { ContactComponent } from './contact/contact.component';

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
	ContactComponent
	],
	imports: [
	BrowserModule,
	FormsModule,
	HttpModule,
	AppRoutingModule,
	NgbModule,
	NgxPaginationModule
	],
	providers: [NewsComponent],
	bootstrap: [AppComponent]
})
export class AppModule { }

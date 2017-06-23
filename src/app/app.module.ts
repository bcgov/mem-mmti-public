import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ProjectComponent } from './project/project.component';
import { NewsComponent } from './news/news.component';

@NgModule({
	declarations: [
	AppComponent,
	ProjectComponent,
	NewsComponent
	],
	imports: [
	BrowserModule,
	FormsModule,
	HttpModule,
	AppRoutingModule,
	NgbModule
	],
	providers: [NewsComponent],
	bootstrap: [AppComponent]
})
export class AppModule { }

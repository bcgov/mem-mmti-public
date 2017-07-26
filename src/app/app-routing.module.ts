import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizationsComponent } from 'app/authorizations/authorizations.component';
import { ComplianceOversightComponent } from 'app/compliance-oversight/compliance-oversight.component';
import { ContactComponent } from 'app/contact/contact.component';
import { HomeComponent } from 'app/home/home.component';
import { LegislationComponent } from 'app/legislation/legislation.component';
import { ProcessComponent } from 'app/process/process.component';
import { ProjectComponent } from 'app/project/project.component';
import { NewsComponent } from 'app/news/news.component';

const routes: Routes = [
  {
    path: 'authorizations',
    component: AuthorizationsComponent
  },
  {
    path: 'compliance-oversight',
    component: ComplianceOversightComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'legislation',
    component: LegislationComponent
  },
  {
    path: 'process',
    component: ProcessComponent
  },
  {
    path: 'project',
    component: ProjectComponent
  },
  {
    path: 'news',
    component: NewsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

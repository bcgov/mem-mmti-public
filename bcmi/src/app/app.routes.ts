import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizationsComponent } from './static-pages/authorizations/authorizations.component';
import { ComplianceOversightComponent } from './static-pages/compliance-oversight/compliance-oversight.component';
import { ContactComponent } from './static-pages/contact/contact.component';
import { HomeComponent } from './home/home.component';
import { LegislationComponent } from './static-pages/legislation/legislation.component';
import { LifecycleComponent } from './static-pages/lifecycle/lifecycle.component';
import { ReclamationComponent } from './static-pages/reclamation/reclamation.component';
import { TailingsManagementComponent } from './static-pages/tailings-management/tailings-management.component';
import { TopicsOfInterestComponent } from './static-pages/topics-of-interest/topics-of-interest.component';
import { WaterQualityComponent } from './static-pages/water-quality/water-quality.component';
import { PageComponent } from './static-pages/page/page.component';
import { MainMapComponent } from './map/main-map/main-map.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {ContentResolver} from './services/content-resolver'

export const routes: Routes = [
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
    path: 'lifecycle',
    component: LifecycleComponent
  },
  {
    path: 'reclamation',
    component: ReclamationComponent
  },
  {
    path: 'tailings-management',
    component: TailingsManagementComponent
  },
  {
    path: 'topics-of-interest',
    component: TopicsOfInterestComponent
  },
  {
    path: 'water-quality',
    component: WaterQualityComponent
  },
  {
    path: 'map',
    component: MainMapComponent
  },
  {
    path: 'page',
    component: PageComponent,
    resolve: {
      pageData: ContentResolver
    }
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

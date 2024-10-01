import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizationsComponent } from './static-pages/authorizations/authorizations.component';
//import { ComplianceOversightComponent } from './static-pages/compliance-oversight/compliance-oversight.component';
import { ContactComponent } from './static-pages/contact/contact.component';
import { HomeComponent } from './home/home.component';
//import { LegislationComponent } from './static-pages/legislation/legislation.component';
//import { LifecycleComponent } from './static-pages/lifecycle/lifecycle.component';
import { ReclamationComponent } from './static-pages/reclamation/reclamation.component';
import { TailingsManagementComponent } from './static-pages/tailings-management/tailings-management.component';
import { TopicsOfInterestComponent } from './static-pages/topics-of-interest/topics-of-interest.component';
import { WaterQualityComponent } from './static-pages/water-quality/water-quality.component';
import { MainMapComponent } from './map/main-map/main-map.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  {
    path: 'authorizations',
    component: AuthorizationsComponent
  },
  /* Commenting out for demo
  {
    path: 'compliance-oversight',
    component: ComplianceOversightComponent
  },
  */
  {
    path: '',
    component: HomeComponent
  },
  /* Commenting out for demo
  {
    path: 'legislation',
    component: LegislationComponent
  },
  */
  /* Commenting out for demo
  {
    path: 'lifecycle',
    component: LifecycleComponent
  },
  */
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
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'map',
    component: MainMapComponent
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

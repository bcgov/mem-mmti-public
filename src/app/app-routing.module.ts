import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizationsComponent } from 'app/static-pages/authorizations/authorizations.component';
import { ComplianceOversightComponent } from 'app/static-pages/compliance-oversight/compliance-oversight.component';
import { ContactComponent } from 'app/static-pages/contact/contact.component';
import { HomeComponent } from 'app/home/home.component';
import { LegislationComponent } from 'app/static-pages/legislation/legislation.component';
import { LifecycleComponent } from 'app/static-pages/lifecycle/lifecycle.component';
import { ReclamationComponent } from 'app/static-pages/reclamation/reclamation.component';
import { TailingsManagementComponent } from 'app/static-pages/tailings-management/tailings-management.component';
import { TopicsOfInterestComponent } from 'app/static-pages/topics-of-interest/topics-of-interest.component';
import { WaterQualityComponent } from 'app/static-pages/water-quality/water-quality.component';
import { MainMapComponent } from 'app/map/main-map/main-map.component';
import { NotFoundComponent } from 'app/not-found/not-found.component';
import { EnforcementActionsComponent } from 'app/static-pages/enforcement-actions/enforcement-actions.component';

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
    path: 'enforcement-actions',
    component: EnforcementActionsComponent
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

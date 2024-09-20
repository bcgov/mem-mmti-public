import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnforcementActionsListComponent } from '../enforcement-actions/enforcement-actions-list/enforcement-actions-list.component';
import { AdministrativePenaltiesTabContentComponent } from '../enforcement-actions/administrative-penalties-tab-content/administrative-penalties-tab-content.component';
import { OffenceProsecutionsTabContentComponent } from '../enforcement-actions/offence-prosecutions-tab-content/offence-prosecutions-tab-content.component';

import { EnforcementActionsResolver } from '../enforcement-actions/enforcement-actions-resolver';

const routes: Routes = [
  {
    path: 'enforcement-actions',
    component: EnforcementActionsListComponent,
    resolve: {
      data: EnforcementActionsResolver
    },
    children: [
      { path: '', redirectTo: 'administrative-penalties', pathMatch: 'full' },
      { path: 'administrative-penalties', component: AdministrativePenaltiesTabContentComponent },
      { path: 'offense-prosecutions', component: OffenceProsecutionsTabContentComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [EnforcementActionsResolver]
})
export class EnforcementActionsRoutingModule {}

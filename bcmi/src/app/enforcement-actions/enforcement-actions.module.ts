import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnforcementActionsRoutingModule } from './enforcement-actions-routing.module';
import { OffenceProsecutionsTabContentComponent } from './offence-prosecutions-tab-content/offence-prosecutions-tab-content.component';
import { AdministrativePenaltiesTabContentComponent } from './administrative-penalties-tab-content/administrative-penalties-tab-content.component';
import { EnforcementActionsListComponent } from './enforcement-actions-list/enforcement-actions-list.component';

// services
import { Api } from '@services/api';
import { EnforcementActionsService } from '@services/enforcement-actions.service';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    OffenceProsecutionsTabContentComponent,
    AdministrativePenaltiesTabContentComponent,
    EnforcementActionsListComponent
  ],
  providers: [Api, EnforcementActionsService],
  imports: [CommonModule, EnforcementActionsRoutingModule, SharedModule, RouterModule]
})
export class EnforcementActionsModule {}

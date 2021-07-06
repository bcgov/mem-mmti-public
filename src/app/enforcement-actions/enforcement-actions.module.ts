import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnforcementActionsRoutingModule } from './enforcement-actions-routing.module';
import { OffenceProsecutionsTabContentComponent } from './offence-prosecutions-tab-content/offence-prosecutions-tab-content.component';
import { AdministrativePenaltiesTabContentComponent } from './administrative-penalties-tab-content/administrative-penalties-tab-content.component';
import { EnforcementActionsListComponent } from './enforcement-actions-list/enforcement-actions-list.component';

// services
import { Api } from 'app/services/api';
import { EnforcementActionsService } from 'app/services/enforcement-actions.service';
import { SharedModule } from 'app/shared/shared.module';
@NgModule({
  declarations: [
    OffenceProsecutionsTabContentComponent,
    AdministrativePenaltiesTabContentComponent,
    EnforcementActionsListComponent
  ],
  providers: [Api, EnforcementActionsService],
  imports: [CommonModule, EnforcementActionsRoutingModule, SharedModule]
})
export class EnforcementActionsModule {}

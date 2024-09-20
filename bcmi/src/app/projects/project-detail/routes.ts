import { Routes } from '@angular/router';

import { OverviewTabContentComponent } from '@projects/project-detail/overview/overview-tab-content.component';
import { AuthorizationsTabContentComponent } from '@projects/project-detail/authorizations/authorizations-tab-content.component';
import { ComplianceTabContentComponent } from '@projects/project-detail/compliance/compliance-tab-content.component';
import { DocumentsTabContentComponent } from '@projects/project-detail/documents/documents-tab-content.component';

export const TAB_NAV_ROUTES: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: 'overview', component: OverviewTabContentComponent },
  { path: 'authorizations', component: AuthorizationsTabContentComponent },
  { path: 'compliance', component: ComplianceTabContentComponent },
  { path: 'docs', component: DocumentsTabContentComponent }
];

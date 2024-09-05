import { Routes } from '@angular/router';

import { OverviewTabContentComponent } from 'app/projects/project-detail/overview/overview-tab-content.component';
import { AuthorizationsTabContentComponent } from 'app/projects/project-detail/authorizations/authorizations-tab-content.component';
import { ComplianceTabContentComponent } from 'app/projects/project-detail/compliance/compliance-tab-content.component';
import { DocumentsTabContentComponent } from 'app/projects/project-detail/documents/documents-tab-content.component';

export const TAB_NAV_ROUTES: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: 'overview', component: OverviewTabContentComponent },
  { path: 'authorizations', component: AuthorizationsTabContentComponent },
  { path: 'compliance', component: ComplianceTabContentComponent },
  { path: 'docs', component: DocumentsTabContentComponent }
];

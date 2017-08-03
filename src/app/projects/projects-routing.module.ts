import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectDetailResolver } from './project-detail-resolver.service';
import { TAB_NAV_ROUTES } from './project-detail/routes';

const routes: Routes = [
  {
    path: 'projects',
    component: ProjectListComponent
  },
  {
    path: 'p/:id',
    component: ProjectDetailComponent,
    resolve: {
      project: ProjectDetailResolver  // <-- Retrieve project details from server before navigating to this route
    },
    children: TAB_NAV_ROUTES  // each tab within the page navigates to a separate route; e.g. /p/:id/(overview|compliance|docs)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ProjectDetailResolver]
})
export class ProjectsRoutingModule { }

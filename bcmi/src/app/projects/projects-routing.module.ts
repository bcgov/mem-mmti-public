import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectListComponent } from '@projects/project-list/project-list.component';
import { ProjectDetailComponent } from '@projects/project-detail/project-detail.component';
import { ProjectDetailResolver } from '@projects/project-detail-resolver.service';
import { TAB_NAV_ROUTES } from '@projects/project-detail/routes';

const routes: Routes = [
  {
    path: 'mines',
    component: ProjectListComponent
  },
  {
    path: 'mine/:code',
    component: ProjectDetailComponent,
    resolve: {
      project: ProjectDetailResolver
    },
    children: TAB_NAV_ROUTES  // each tab within the page navigates to a separate route; e.g. /p/:code/(overview|compliance|docs)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ProjectDetailResolver]
})
export class ProjectsRoutingModule { }

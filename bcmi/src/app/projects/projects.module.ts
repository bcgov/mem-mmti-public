import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

// modules
import { MapModule } from '../map/map.module';
import { ProjectsRoutingModule } from '@projects/projects-routing.module';

// components
import { ProjectListComponent } from '@projects/project-list/project-list.component';
import { ProjectDetailComponent } from '@projects/project-detail/project-detail.component';
import { AuthorizationsTabContentComponent } from '@projects/project-detail/authorizations/authorizations-tab-content.component';
import { ComplianceTabContentComponent } from '@projects/project-detail/compliance/compliance-tab-content.component';
import { DocumentsTabContentComponent } from '@projects/project-detail/documents/documents-tab-content.component';
import { SiteActivitiesComponent } from '@projects/site-activities/site-activities.component';
import { OrderByPipe } from '@pipes/filters/order-by.pipe';
import { OverviewTabContentComponent } from './project-detail/overview/overview-tab-content.component';

// services
import { Api } from '@services/api';
import { ProjectService } from '@services/project.service';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    ProjectsRoutingModule,
    MapModule,
    FormsModule,
    SharedModule,
    RouterModule
  ],
  declarations: [
    ProjectListComponent,
    ProjectDetailComponent,
    OverviewTabContentComponent,
    AuthorizationsTabContentComponent,
    ComplianceTabContentComponent,
    DocumentsTabContentComponent,
    SiteActivitiesComponent,
    OrderByPipe,
  ],
  exports: [
    ProjectListComponent,
    ProjectDetailComponent
  ],
  providers: [
    Api,
    ProjectService
  ]
})
export class ProjectsModule { }

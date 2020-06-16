import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

// modules
import { MapModule } from 'app/map/map.module';
import { ProjectsRoutingModule } from 'app/projects/projects-routing.module';

// components
import { ProjectListComponent } from 'app/projects/project-list/project-list.component';
import { ProjectDetailComponent } from 'app/projects/project-detail/project-detail.component';
import { OverviewTabContentComponent } from 'app/projects/project-detail/overview/overview-tab-content.component';
import { AuthorizationsTabContentComponent } from 'app/projects/project-detail/authorizations/authorizations-tab-content.component';
import { ComplianceTabContentComponent } from 'app/projects/project-detail/compliance/compliance-tab-content.component';
import { DocumentsTabContentComponent } from 'app/projects/project-detail/documents/documents-tab-content.component';
import { SiteActivitiesComponent } from 'app/projects/site-activities/site-activities.component';
import { OrderByPipe } from 'app/pipes/filters/order-by.pipe';

// services
import { Api } from 'app/services/api';
import { ProjectService } from 'app/services/project.service';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    ProjectsRoutingModule,
    MapModule,
    FormsModule,
    SharedModule
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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectFilterPipe } from 'app/object-filter.pipe';
import { OperatorFilterPipe } from 'app/operator-filter.pipe';
import { ProjectTypeFilterPipe } from 'app/project-type-filter.pipe';
import { ProjectStatusFilterPipe } from 'app/project-status-filter.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ObjectFilterPipe,
    OperatorFilterPipe,
    ProjectTypeFilterPipe,
    ProjectStatusFilterPipe
  ],
  exports: [
    ObjectFilterPipe,
    OperatorFilterPipe,
    ProjectTypeFilterPipe,
    ProjectStatusFilterPipe
  ]
})
export class SharedModule { }

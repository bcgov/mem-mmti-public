import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectFilterPipe } from '@pipes/object-filter.pipe';
import { OperatorFilterPipe } from '@pipes/operator-filter.pipe';
import { ProjectTypeFilterPipe } from '@pipes/project-type-filter.pipe';
import { ProjectStatusFilterPipe } from '@pipes/project-status-filter.pipe';
import { RemoveStringValuePipe } from '@pipes/remove-string-value.pipe';
import { SafeHtmlPipe } from '@pipes/safe-html.pipe';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    ObjectFilterPipe,
    OperatorFilterPipe,
    ProjectTypeFilterPipe,
    ProjectStatusFilterPipe,
    RemoveStringValuePipe,
    SafeHtmlPipe
  ],
  exports: [
    ObjectFilterPipe,
    OperatorFilterPipe,
    ProjectTypeFilterPipe,
    ProjectStatusFilterPipe,
    RemoveStringValuePipe,
    SafeHtmlPipe
  ]
})
export class SharedModule { }

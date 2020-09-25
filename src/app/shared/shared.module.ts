import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectFilterPipe } from 'app/pipes/object-filter.pipe';
import { OperatorFilterPipe } from 'app/pipes/operator-filter.pipe';
import { ProjectTypeFilterPipe } from 'app/pipes/project-type-filter.pipe';
import { ProjectStatusFilterPipe } from 'app/pipes/project-status-filter.pipe';
<<<<<<< Updated upstream
import { RemoveStringValuePipe } from 'app/pipes/remove-string-value.pipe';
=======
import { SafeHtmlPipe } from 'app/pipes/safe-html.pipe';
>>>>>>> Stashed changes

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ObjectFilterPipe,
    OperatorFilterPipe,
    ProjectTypeFilterPipe,
    ProjectStatusFilterPipe,
<<<<<<< Updated upstream
    RemoveStringValuePipe
=======
    SafeHtmlPipe
>>>>>>> Stashed changes
  ],
  exports: [
    ObjectFilterPipe,
    OperatorFilterPipe,
    ProjectTypeFilterPipe,
    ProjectStatusFilterPipe,
<<<<<<< Updated upstream
    RemoveStringValuePipe
=======
    SafeHtmlPipe
>>>>>>> Stashed changes
  ]
})
export class SharedModule { }

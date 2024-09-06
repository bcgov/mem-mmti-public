import { Pipe, PipeTransform } from '@angular/core';
import { Project } from '@models/project';

@Pipe({
  name: 'projectStatusFilter'
})
export class ProjectStatusFilterPipe implements PipeTransform {

    transform(value: Project[], q: string) {
        if (!q || q === '') {
            return value;
        }
        return value.filter(item => -1 < item.status.toLowerCase().indexOf(q.toLowerCase()));
    }
}

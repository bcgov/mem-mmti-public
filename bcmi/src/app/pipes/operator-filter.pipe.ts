import { Pipe, PipeTransform } from '@angular/core';
import { Project } from '@models/project';

@Pipe({
  name: 'operatorFilter'
})
export class OperatorFilterPipe implements PipeTransform {

  transform(value: Project[], q: string) {
    if (!q) {
        return value;
    }
    return value.filter(item => -1 < item.permittee.toLowerCase().indexOf(q.toLowerCase()));
  }
}

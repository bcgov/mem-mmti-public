import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeStringValue'
})
export class RemoveStringValuePipe implements PipeTransform {

    transform(value: string, toRemove: string) {
        if (!toRemove || toRemove === '') {
            return value;
        }
        return value.replace(toRemove, '').trim();
    }
}

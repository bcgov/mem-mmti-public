import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'orderBy'
})

export class OrderByPipe implements PipeTransform {

    transform(records: Array<any>, args?: any): any {

        if (!args.property && !args.direction) {
            return records;
        }

        return records.sort(function(a, b) {
            if (!args) {
                return 0;
            }

            // MBL TODO: Assume name for sub-property.  Fix this to be more generic.
            if (typeof a[args.property] === 'object') {
                if (a[args.property].name.toLowerCase() < b[args.property].name.toLowerCase()) {
                    return -1 * args.direction;
                } else if ( a[args.property].name.toLowerCase() > b[args.property].name.toLowerCase()) {
                    return 1 * args.direction;
                } else {
                    return 0;
                }
            } else {
                if (a[args.property].toLowerCase() < b[args.property].toLowerCase()) {
                    return -1 * args.direction;
                } else if ( a[args.property].toLowerCase() > b[args.property].toLowerCase()) {
                    return 1 * args.direction;
                } else {
                    return 0;
                }
            }
        });
    };
}

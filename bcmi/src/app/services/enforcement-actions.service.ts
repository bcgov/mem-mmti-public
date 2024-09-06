import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';

import { Api } from '@services/api';
import { AdministrativePentalty } from '@models/administrative-penalty';
import { CourtConviction } from '@models/court-conviction';

@Injectable({
  providedIn: 'root'
})
export class EnforcementActionsService {
  constructor(private api: Api) {}

  public getAll() {
    return this.api.getEnforcementActions().pipe(
      map((res: any[]) => {
        const enforcements = res && res.length > 0 && res[0]['searchResults'] ? res[0]['searchResults'] : [];

        const courtConvictions = enforcements
          .filter(enforcement => enforcement._schemaName === 'CourtConvictionBCMI')
          .map(enforcement => new CourtConviction(enforcement));

        const administrativePenalties = enforcements
          .filter(enforcement => enforcement._schemaName === 'AdministrativePenaltyBCMI')
          .map(enforcement => new AdministrativePentalty(enforcement));

        return { courtConvictions, administrativePenalties };
      }),
      catchError(this.api.handleError)
    );
  }
}

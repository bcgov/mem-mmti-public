import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ConfigService } from '@services/config.service';
import { LoggerService } from '@services/logger.service';

@Component({
  selector: 'app-enforcement-actions-list',
  templateUrl: './enforcement-actions-list.component.html',
  styleUrls: ['./enforcement-actions-list.component.scss']
})
export class EnforcementActionsListComponent implements OnInit {
  public pageText = '';
  public loading = true;

  public tabLinks = [
    { label: 'Administrative Monetary Penalties', link: 'administrative-penalties' },
    { label: 'Offence Prosecutions', link: 'offense-prosecutions' }
  ];

  constructor(
    private configService: ConfigService,
    private _changeDetectionRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private logger: LoggerService
  ) {
    if (this.configService.config.ENFORCEMENT_ACTION_TEXT) {
      this.pageText = this.configService.config.ENFORCEMENT_ACTION_TEXT.data.text;
    }
  }

  ngOnInit(): void {
    this.loading = true;

    this.route.data.subscribe(
      () => {
        this.loading = false;
      },
      error => this.logger.log(error)
    );

    this._changeDetectionRef.detectChanges();
  }
}

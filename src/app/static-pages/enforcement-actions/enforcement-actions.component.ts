import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'app/services/config.service';

@Component({
  selector: 'app-empr-ea',
  templateUrl: './enforcement-actions.component.html',
  styleUrls: ['./enforcement-actions.component.scss']
})
export class EnforcementActionsComponent implements OnInit {

  public enforcementText = 'The Ministry of Energy, Mines, and Low Carbon Innovation seeks to achieve voluntary compliance with applicable requirements wherever possible. This is generally achieved through the issuance of orders to remedy non-compliance. Where voluntary compliance cannot be achieved or where the non-compliance presents more significant risks, the Ministry may pursue the imposition of an administrative monetary penalty (AMP) or an offence prosecution.';

  constructor(private configService: ConfigService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    if (this.configService.config.ENFORCEMENT_ACTION_TEXT) {
      this.enforcementText = this.configService.config.ENFORCEMENT_ACTION_TEXT.data.text;
    }
  }

}

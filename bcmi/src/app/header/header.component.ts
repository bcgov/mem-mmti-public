import { Component, Input, OnInit } from '@angular/core';
import { Header } from '@app/models/content/header';
import { Api } from '@services/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  @Input() navigation: any;
  hostname: string;
  constructor( private api: Api) { }

  ngOnInit() {
    this.hostname = this.api.hostnameNRPTI;
    window.scrollTo(0, 0);
  }

  preventDefault($event: MouseEvent) {
    $event.stopPropagation();
   }

}


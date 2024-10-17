import { Component, Input } from '@angular/core';
import { Api } from '@services/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  @Input() navigation: any;
  hostname: string;
  constructor( private api: Api) { }

  preventDefault($event: Event) {
    $event.stopPropagation();
   }

}


import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dynamic-link',
  template: `<a [routerLink]="routerLink" [fragment]="fragment" [innerHTML]="linkHTML" [ngClass]="linkClass"></a>`,
})
export class DynamicLinkComponent {
  @Input() routerLink: string;
  @Input() fragment:string | undefined;
  @Input() linkHTML: string;
  @Input() linkClass: string;

  constructor(private router: Router) {}
}

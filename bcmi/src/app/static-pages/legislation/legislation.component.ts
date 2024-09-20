import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-legislation',
  templateUrl: './legislation.component.html',
  styleUrls: ['./legislation.component.scss']
})
export class LegislationComponent implements OnInit {

  ngOnInit() {
    window.scrollTo(0, 0);
  }

}

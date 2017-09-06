import { Component, OnInit } from '@angular/core';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {
  protoSearchActive: boolean;
  showAdvancedFields: boolean;

  constructor(calender: NgbCalendar) {
  }

  ngOnInit() {
    this.showAdvancedFields = false;
  }

  toggleAdvancedSearch() {
    this.showAdvancedFields = !this.showAdvancedFields;
  }

  performSearch() {
    this.protoSearchActive = !this.protoSearchActive;
  }
}

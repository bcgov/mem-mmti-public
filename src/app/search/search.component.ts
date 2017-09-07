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

  onSubmit(form: any) {
    console.log('submitted:', form);

    // Get the keywords
    const keywordsArr = form.keywordInput.split(' ');
    console.log('keywords:', keywordsArr);

    // Get the Project
    if (form.projectInput) {
      console.log(form.projectInput);
    }

    // Get the Owner/Operator
    if (form.ownerOperatorInput) {
      console.log(form.ownerOperatorInput);
    }

    // Date Range Start/End
    if (form.dateRangeStartInput) {
      console.log(form.dateRangeStartInput);
    }
    if (form.dateRangeEndInput) {
      console.log(form.dateRangeEndInput);
    }
  }

  dostuff() {
    console.log('TODO');
  }
}

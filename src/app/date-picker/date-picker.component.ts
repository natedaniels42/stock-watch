import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {
  start = '';
  end = '';

  constructor() {
    
  }

  handleChange(event: Event) {
    console.log(this.start);
    console.log(this.end);
  }

  ngOnInit(): void {
  }

}

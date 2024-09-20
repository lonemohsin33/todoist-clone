import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-picker-component',
  templateUrl: './time-picker-component.component.html',
  styleUrls: ['./time-picker-component.component.scss']
})
export class TimePickerComponentComponent implements OnInit {
  time = { hour: 13, minute: 30 };
	meridian = true;

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-calender-component',
  templateUrl: './calender-component.component.html',
  styleUrls: ['./calender-component.component.scss']
})
export class CalenderComponentComponent implements OnInit {
  due_date: NgbDateStruct
  time:NgbTimeStruct = { hour: 13, minute: 30, second: 0 };
  hourStep = 1;
  minuteStep = 15;
  meridian = false;

  constructor() { }

  ngOnInit() {
  }

  on_date_select(event){
    // this.calendar_open= false
    // const day_difference = event.day - this.today.day;
    // let category;
    // if (day_difference === 0) {
    //   category = 'Today';
    // } else if (day_difference === 1) {
    //   category = 'Tomorrow';
    // } else if (day_difference >= 2 && day_difference <= 7) {
    //   category = 'week'; 
    // }else if (day_difference > 7 && day_difference <= 30) {
    //   category = 'month'; 
    // } else {
    //   category = 'default'; // Default category
    // }
  
    // switch(category) {
    //   case 'Today':
    //     this.date_to_show = "Today";
    //     break;
    //   case 'Tomorrow':
    //     this.date_to_show = "Tomorrow";
    //     break;
    //   case 'week':
    //     this.date_to_show = "This Week";
    //     break;
    //   case 'month':
    //     this.date_to_show = "This Month";
    //     break;
    //   default:
    //     this.date_to_show = event.day + " " + this.month_names[event.month] + " " + event.year;
    // }
    // this.due_date = event
    console.log(event)

  }

}

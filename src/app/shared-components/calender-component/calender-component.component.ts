import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgbDateStruct, NgbDatepicker, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-calender-component',
  templateUrl: './calender-component.component.html',
  styleUrls: ['./calender-component.component.scss']
})
export class CalenderComponentComponent implements OnInit {
  @ViewChild('calender')  calender!:ElementRef 
  @ViewChild('datepicker') datepicker: NgbDatepicker;
  @Output() date_to_show = new EventEmitter()
  @Output() calendar_open = new EventEmitter()
  due_date: NgbDateStruct
  time:NgbTimeStruct = { hour: 13, minute: 30, second: 0 };
  hourStep = 1;
  minuteStep = 15;
  meridian = false;
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  month_names = {1:"Jan", 2: "Feb", 3:"March", 4:"April", 5:"May", 6:"June", 7:"July", 8:"Aug", 9:"Sep", 10:"Oct", 11:"Nov", 12:"Dec"}
  today:NgbDateStruct
  day_name= ""
  min_date:NgbDateStruct

  constructor() { }

  ngOnInit() {
    this.set_today()
  }

  set_focus(){
    if (this.calender){
      const inputElement: HTMLElement = this.calender.nativeElement.querySelector('#button');
      if (inputElement) {
          inputElement.focus(); // Focus on the input field inside the task card
      }
    }
  }

  on_date_select(event){
    const date_time_date_format=this.combine_date_and_time(event)
    const day_difference = event.day - this.today.day;
    const year_diff = Number(event.year) - Number(this.today.year)
    let year = event.year
    if (year_diff==0){
      year = ""
    }
    let time = this.time.hour +":"+ this.time.minute
    let category;
    if (day_difference === 0) {
      category = 'Today';
    } else if (day_difference === 1) {
      category = 'Tomorrow';
    } else if (day_difference >= 2 && day_difference <= 7) {
      category = 'week'; 
    }else if (day_difference > 7 && day_difference <= 30) {
      category = 'month'; 
    } else {
      category = 'default'; // Default category
    }
  
    switch(category) {
      case 'Today':
        this.date_to_show.emit({day:"Today", time:time, day_diff:day_difference, date_time_date_format:date_time_date_format});
        break;
      case 'Tomorrow':
        this.date_to_show.emit({day:"Tomorrow", time: time, day_diff:day_difference, date_time_date_format:date_time_date_format});
        break;
      case 'week':
        this.date_to_show.emit({day:"This Week", time:time, day_diff:day_difference, date_time_date_format:date_time_date_format});
        break;
      case 'month':
        this.date_to_show.emit({day:"This Month", time:this.time, day_diff:day_difference, date_time_date_format:date_time_date_format});
        break;
      default:
        this.date_to_show.emit({day:event.day + " " + this.month_names[event.month] + " " + year, time:time, day_diff:day_difference, date_time_date_format:date_time_date_format});
    }
    this.calendar_open.emit(false)
    this.due_date = event
    console.log(event)

  }

  set_today() {
    const now = new Date();
    this.today = {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate()
    };
    this.due_date = this.today
    this.min_date = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() }
  }

  close_calender(){
    this.calendar_open.emit(false)
  }

  combine_date_and_time(date_values){
    const date_time = new Date(date_values.year, date_values.month - 1, date_values.day, 
      this.time.hour, this.time.minute, this.time.second);
    return date_time
  }

}

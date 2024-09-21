import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbDateStruct, NgbDatepicker, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss']
})
export class TodayComponent implements OnInit {
  @ViewChild('datepicker', {static:false}) datepicker: NgbDatepicker;
  @Input() show_navbar:Boolean = true
  is_hovered:boolean = false
  task_list: {}[] = JSON.parse(localStorage.getItem("task_list"))|| []
  new_task_clicked: boolean = false
  calendar_open = false
  month_names = {1:"Jan", 2: "Feb", 3:"March", 4:"April", 5:"May", 6:"June", 7:"July", 8:"Aug", 9:"Sep", 10:"Oct", 11:"Nov", 12:"Dec"}
  due_date: NgbDateStruct
  today: NgbDateStruct; // To store today's date
  date_to_show= ""
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  day_name = ""
  time:NgbTimeStruct = { hour: 13, minute: 30, second: 0 };
  hourStep = 1;
  minuteStep = 15;
  meridian = false;
  constructor() { }

  ngOnInit() {
    this.set_today()
  }

  set_today() {
    const now = new Date();
    this.today = {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate()
    };
    this.due_date = this.today
    this.day_name = this.days[now.getDay()];
    console.log(this.day_name)
  }

  recieve_collapse_event(event){
    console.log(event)
    this.show_navbar = event
  }

  on_hover() {
    this.is_hovered = true;
  }

  on_leave() {
    this.is_hovered = false;
  }

  create_new_task(){
    this.new_task_clicked = true
  }

  on_date_select(event){
    this.calendar_open= false
    const day_difference = event.day - this.today.day;
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
        this.date_to_show = "Today";
        break;
      case 'Tomorrow':
        this.date_to_show = "Tomorrow";
        break;
      case 'week':
        this.date_to_show = "This Week";
        break;
      case 'month':
        this.date_to_show = "This Month";
        break;
      default:
        this.date_to_show = event.day + " " + this.month_names[event.month] + " " + event.year;
    }
    this.due_date = event
    console.log(this.today)

  }

  add_new_task(task){
    this.task_list.push(task)
    console.log(this.task_list)
    localStorage.setItem("task_list", JSON.stringify(this.task_list))
    this.new_task_clicked = false
  }

}

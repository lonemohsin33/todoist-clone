import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { TaskCardComponent } from '../task-card/task-card.component';
import { DateService } from 'src/app/services/date.service';
import { Task } from '../task-card/interfaces';

@Component({
  selector: 'app-inbox-content',
  templateUrl: './inbox-content.component.html',
  styleUrls: ['./inbox-content.component.scss']
})
export class InboxContentComponent implements OnInit {
  @ViewChild('datepicker', {static:false}) datepicker: NgbDatepicker;
  @ViewChild('taskcard', {static:false}) taskcard!:ElementRef ;
  @ViewChild(TaskCardComponent, {static:false}) task_card_comp!: TaskCardComponent;
  @ViewChild('rescheduleButton', { static: false }) rescheduleButton!: ElementRef;
  @Output() task_count = new EventEmitter()

  
  @Input() show_navbar:Boolean = true
  is_hovered:boolean = false
  task_list: Task[] = JSON.parse(localStorage.getItem("task_list"))|| []
  show_task_card: boolean = false
  date_extended = {}
  today_task_list = []
  overdue_task_list = []

  constructor(private date:DateService) { }

  ngOnInit() {
    this.date_extended= this.date.set_and_get_today()
    this.filter_tasks()
  }

  filter_tasks(){
    this.task_list = JSON.parse(localStorage.getItem('task_list')||'[]')
    let sorted_tasks = this.task_list.sort((a, b) => new Date(a.date_time_date_format).getTime() - new Date(b.date_time_date_format).getTime());
    this.task_list = sorted_tasks

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
    this.show_task_card = true
    setTimeout(() => {
      if (this.task_card_comp) {
          this.task_card_comp.set_focus(); // Call the set_focus method on the child component
      }
  }, 0); 
  }

  add_new_task(task){
    if (task.day_diff ==0){
      this.today_task_list.push(task)
    }
    this.task_list.push(task)
    this.count_tasks()
    console.log(this.task_list)
    localStorage.setItem("task_list", JSON.stringify(this.task_list))
    this.show_task_card = false
  }

  show_card(event){
    console.log(event)
    this.show_task_card = event
  }

  date_event(event){
    this.date_extended = event
  }

  count_tasks(){
    let task_count = {"Today": this.today_task_list.length + this.overdue_task_list.length,"Inbox":this.task_list.length, "Upcoming":this.task_list.length-(this.today_task_list.length + this.overdue_task_list.length)}
    console.log(this.task_list)
    this.task_count.emit(task_count)
  }

}

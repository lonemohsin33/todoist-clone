import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { TaskCardComponent } from '../task-card/task-card.component';
import { DateService } from 'src/app/services/date.service';

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

  
  @Input() show_navbar:Boolean = true
  is_hovered:boolean = false
  task_list: {}[] = JSON.parse(localStorage.getItem("task_list"))|| []
  show_task_card: boolean = false
  date_extended = {}
  today_task_list = []
  overdue_task_list = []
  all_tasks=[]

  constructor(private date:DateService) { }

  ngOnInit() {
    this.date_extended= this.date.set_and_get_today()
    this.filter_tasks()
  }

  filter_tasks(){
    this.all_tasks = JSON.parse(localStorage.getItem('task_list')||'[]')
    // this.all_tasks = this.all_tasks.sort((a, b) => new Date(a.date) - new Date(b.date));

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

}

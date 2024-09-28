import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgbDateStruct, NgbDatepicker, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { DateService } from 'src/app/services/date.service';
import { CalenderComponentComponent } from 'src/app/shared-components/calender-component/calender-component.component';
import { TaskCardComponent } from '../task-card/task-card.component';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss']
})
export class TodayComponent implements OnInit {
  @ViewChild('datepicker', {static:false}) datepicker: NgbDatepicker;
  @ViewChild('taskcard', {static:false}) taskcard!:ElementRef ;
  @ViewChild(TaskCardComponent, {static:false}) task_card_comp!: TaskCardComponent;
  
  @Input() show_navbar:Boolean = true
  is_hovered:boolean = false
  task_list: {}[] = JSON.parse(localStorage.getItem("task_list"))|| []
  show_task_card: boolean = false
  date_extended = {}
  constructor(private date:DateService) { }

  ngOnInit() {
    this.date_extended= this.date.set_and_get_today()
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

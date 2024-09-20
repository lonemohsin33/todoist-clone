import { style } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {
  @Input() show_card = ""
  @Output() show_card_output = new EventEmitter()
  @Output() show_calender = new EventEmitter()
  @Input()   due_date = "Due date"
  @Output() add_task_to_task_list = new EventEmitter()

  priority = "Priority"
  reminder = "Reminder"
  show_remove_icon:boolean = false
  date_color = ""
  @Input() calendar_open = false
  priority_list = [{"icon": "bi bi-flag-fill", "value": "Priority 1", "color": "red"},
                    {"icon": "bi bi-flag-fill", "value": "Priority 2", "color": "orange" },
                    {"icon": "bi bi-flag-fill", "value": "Priority 3", "color": "blue"},
                    {"icon": "bi bi-flag", "value": "Priority 4", "color": ""}]
  toggle_priority_list = false
  selected_priority = 0
  priority_icon = "bi bi-plus-circle-fill"
  priority_color = ""
  task_name = ""
  task_desc = ""

  constructor() { }

  ngOnInit() {
    console.log(this.show_card)
    this.today_selected()

  }

  // send_card_output(value){
  //   this.show_card_output = value

  // }

  add_task(){
    console.log('task created.')
    let task_obj = {
      "task_name": this.task_name,
      "task_desc": this.task_desc,
      "priority_obj": {
        "priority": this.priority,
        "priority_icon": this.priority_icon,
        "priority_color": this.priority_color
      },
      "due_date": this.due_date
    }
    this.add_task_to_task_list.emit(task_obj)
  }

  today_selected(){
    this.due_date = "Today"
    this.show_remove_icon = true
    console.log(this.show_remove_icon)
  }

  open_calender(){
    console.log('calender Called.')
    this.calendar_open = !this.calendar_open
    console.log(this.calendar_open)
    this.show_calender.emit(this.calendar_open)

  }

  cancel_task(){
    this.due_date = "Due date"
    this.show_card_output.emit(false)
    this.priority = "Priority"
    this.priority_icon = "bi bi-plus-circle-fill"
  }

  remove_today(){
    this.due_date = "Due date"
    this.show_remove_icon = false
  }

  show_priority_list(){
    this.toggle_priority_list = !this.toggle_priority_list
  }

  priority_selected(index, priority_item){
    this.selected_priority = index
    this.priority = priority_item.value
    this.priority_icon = priority_item.icon
    this.priority_color = priority_item.color
    this.toggle_priority_list= false

  }



}

import { style } from '@angular/animations';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CalenderComponentComponent } from 'src/app/shared-components/calender-component/calender-component.component';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {
  @ViewChild(CalenderComponentComponent, {static:false}) calender_comp!:CalenderComponentComponent
  @ViewChild('calender', { static: false }) calender!: ElementRef;
  @ViewChild('taskcard', { static: false }) taskcard!: ElementRef;

  @Input() show_card = false
  @Output() show_card_output = new EventEmitter()
  // @Output() show_calender = new EventEmitter()
  @Input()   due_date = "Due date"
  @Output() add_task_to_task_list = new EventEmitter()
  @Output() date_extended= new EventEmitter()

  priority = "Priority"
  reminder = "Reminder"
  show_remove_icon:boolean = false
  date_color = ""
  calendar_open = false
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
  due_time = ""
  diff_color = ""
  day_diff = 0

  constructor() { }

  ngOnInit() {
    console.log(this.show_card)
    this.today_selected()

  }

  ngAfterViewInit(){
  }

  set_focus(){
    if (this.taskcard){
      const inputElement: HTMLElement = this.taskcard.nativeElement.querySelector('button');
      if (inputElement) {
          inputElement.focus(); // Focus on the input field inside the task card
      }
    }
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
      "due_date": this.due_date,
      "due_color": this.diff_color,
      "day_diff": this.day_diff
    }
    this.add_task_to_task_list.emit(task_obj)
  }

  today_selected(){
    this.due_date = "Today"
    this.diff_color ="green"
    this.show_remove_icon = true
    console.log(this.show_remove_icon)
  }

  open_calender(){
    console.log('calender Called.')
    setTimeout(()=>{
      if (this.calender){
        console.log(this.calender_comp)
        this.calender_comp.set_focus()
        }
    },0)
    

    this.calendar_open = !this.calendar_open
    console.log(this.calendar_open)

  }

  cancel_task(){
    this.due_date = "Due date"
    this.show_card_output.emit(false)
    this.priority = "Priority"
    this.priority_icon = "bi bi-plus-circle-fill"
    this.calendar_open = false
  }

  remove_today(){
    this.due_date = "Due date"
    this.due_time = ""
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

  date_to_show(date_selected){
    console.log(date_selected)
    this.due_date= date_selected.day
    this.due_time = date_selected.time
    let day_diff = date_selected.day_diff
    this.day_diff = day_diff
    this.get_date_color(day_diff)
  }

  get_date_color(day_difference){
    if (day_difference === 0) {
      this.diff_color = "green"
    } else if (day_difference === 1) {
      this.diff_color = "#ad6200"
    } else if (day_difference >= 2 && day_difference <= 7) {
      this.diff_color = "#692ec2"
    } else {
      this.diff_color = "#666"
    }

  }



}

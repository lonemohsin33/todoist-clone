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
  today_task_count=0
  overdue_task_count=0
  upcoming_task_count=0
  total_task_count =0

  constructor(private date:DateService) { }

  ngOnInit() {
    this.date_extended= this.date.set_and_get_today()
    this.filter_tasks()
  }

  get_curr_task_counts(){

  }

  filter_tasks(){
    let task_list = JSON.parse(localStorage.getItem('task_list')||'[]')
    let sorted_tasks = task_list.sort((a, b) => new Date(a.date_time_date_format).getTime() - new Date(b.date_time_date_format).getTime());
    this.task_list = sorted_tasks
    for(let task of task_list){
      this.count_tasks(task)
    }

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

  add_new_task(task:Task){
    this.task_list.push(task)
    console.log(this.task_list)
    localStorage.setItem("task_list", JSON.stringify(this.task_list))
    this.count_tasks(task)
    this.task_count.emit({"Today":this.today_task_count + this.overdue_task_count, "Inbox": this.total_task_count, "Upcoming": this.upcoming_task_count})
    this.show_task_card = false
  }

  show_card(event){
    console.log(event)
    this.show_task_card = event
  }

  date_event(event){
    this.date_extended = event
  }

  count_tasks(task:Task){
    if (task.day_diff==0){
      this.today_task_count+=1
    }else if (task.day_diff==0){
      this.overdue_task_count+=1
    }else if (task.day_diff>=1){
      this.upcoming_task_count+=1
    }
    this.total_task_count+=1
  }

  all_task_list(task_obj){
    this.task_list = this.task_list.filter(obj=>obj.id!==task_obj.id)
    this.remove_tasks(task_obj)
    this.task_count.emit({"Today":this.today_task_count + this.overdue_task_count, "Inbox": this.total_task_count, "Upcoming": this.upcoming_task_count})
  }

  remove_tasks(task:Task){
    if (task.day_diff==0){
      this.today_task_count-=1
    }else if (task.day_diff==0){
      this.overdue_task_count-=1
    }else if (task.day_diff>=1){
      this.upcoming_task_count-=1
    }
    this.total_task_count-=1
  }

  reschedule_single_task(reschedule_obj){
    let task_id = [reschedule_obj['task']['id']]
    let reschedule_date = reschedule_obj['date']
    let due_color = this.get_due_color(reschedule_obj['date']['day_diff'])
    this.reschedule_task_single_multiple(task_id, due_color, reschedule_date)
  }

  reschedule_task_single_multiple(overdue_task_ids, due_color, reschedule_date){
    this.task_list.forEach((task,index)=>{
      if(overdue_task_ids.includes(task['id'])){
        console.log(task)
        task['date_time_date_format'] = reschedule_date['date_time_date_format']
        task['day_diff'] = reschedule_date['day_diff']
        task['due_color'] = due_color
        task['due_date'] = reschedule_date['day']
      }
    })
    localStorage.setItem('task_list', JSON.stringify(this.task_list))
    this.filter_tasks()
  }

  get_due_color(day_difference){
    if (day_difference === 0) {
      return "green"
    } else if (day_difference === 1) {
      return "#ad6200"
    } else if (day_difference >= 2 && day_difference <= 7) {
      return "#692ec2"
    } else {
      return "#666"
    }
  }



}

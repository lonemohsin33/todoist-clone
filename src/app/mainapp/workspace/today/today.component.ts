import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbDateStruct, NgbDatepicker, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { DateService } from 'src/app/services/date.service';
import { CalenderComponentComponent } from 'src/app/shared-components/calender-component/calender-component.component';
import { TaskCardComponent } from '../task-card/task-card.component';
import { DateExtended } from './interface';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss']
})
export class TodayComponent implements OnInit {
  @ViewChild('datepicker') datepicker: NgbDatepicker;
  @ViewChild('taskcard') taskcard!:ElementRef ;
  @ViewChild(TaskCardComponent) task_card_comp!: TaskCardComponent;
  @ViewChild('rescheduleButton') rescheduleButton!: ElementRef;
  @Output() task_count = new EventEmitter()

  
  @Input() show_navbar:Boolean = true
  is_hovered:boolean = false
  task_list: {}[] = JSON.parse(localStorage.getItem("task_list"))|| []
  show_task_card: boolean = false
  date_extended:DateExtended
  today_task_list = []
  overdue_task_list = []
  upcoming_task_list = []
  overdue_not_hidden = true
  calendar_open=false
  calendarPosition = { top: '0px', left: '0px' };
  reschedule_date = {}
  constructor(
    private date:DateService,
    private _supabase_service:SupabaseService) { }

  ngOnInit() {
    this.date_extended = this.date.set_and_get_today()
    this.filter_tasks()
  }

  reschedule_previous_tasks() {
    this.open_calender()
  }

  reschdule_all_previous_tasks(){
    let overdue_task_ids =this.get_overdue_task_ids()  //get task ids
    this.overdue_task_list=[]//empty the overdue list 
    /* get due color first*/
    let due_color = this.get_due_color(this.reschedule_date['day_diff'])
    // change date for these task ids in task list
    this.reschedule_task_single_multiple(overdue_task_ids, due_color, this.reschedule_date)

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
    this._supabase_service.insertData('todo_table', {}).then((data)=>{
      console.log(data)
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

  get_overdue_task_ids(){
    let task_ids = []
    for (let task of this.overdue_task_list){
      task_ids.push(task['id'])
    }
    return task_ids
  }

  is_object_empty(obj){
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  open_calender(){
    this.calendar_open = !this.calendar_open;
    if (this.calendar_open && this.rescheduleButton) {
      const button_rect = this.rescheduleButton.nativeElement.getBoundingClientRect();
      this.calendarPosition.top = `${button_rect.bottom}px`;
      this.calendarPosition.left = `${button_rect.left}px`;
    }
  }

  filter_tasks(){
    let all_tasks = JSON.parse(localStorage.getItem('task_list')||'[]')
    this.today_task_list=[]
    this.overdue_task_list = []
    console.log(all_tasks)
    all_tasks.map((task_item)=>{
      if (task_item.day_diff ==0){
        this.today_task_list.push(task_item)
      }else if (task_item.day_diff<0){
        this.overdue_task_list.push(task_item)
      }else{
        this.upcoming_task_list.push(task_item)
      } 

    })
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

  overdue_task_list_func(task_obj){
    this.overdue_task_list=this.overdue_task_list.filter(obj=>obj.id!==task_obj.id)
    this.count_tasks()
  }

  today_task_list_func(task_obj){
    this.today_task_list=this.today_task_list.filter(obj=>obj.id!==task_obj.id)
    this.count_tasks()
  }

  count_tasks(){
    let task_count = {"Today": this.today_task_list.length + this.overdue_task_list.length,"Inbox":this.task_list.length, "Upcoming":this.task_list.length-(this.today_task_list.length + this.overdue_task_list.length)}
    console.log(this.task_list)
    this.task_count.emit(task_count)
  }

  date_to_show(date){
    console.log(date)
    this.reschedule_date = date
    this.reschdule_all_previous_tasks()
  }

  reschedule_single_task(reschedule_obj){
    let task_id = [reschedule_obj['task']['id']]
    let reschedule_date = reschedule_obj['date']
    let due_color = this.get_due_color(reschedule_obj['date']['day_diff'])
    this.reschedule_task_single_multiple(task_id, due_color, reschedule_date)
  }

}

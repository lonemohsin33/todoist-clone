import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Task } from '../task-card/interfaces';

@Component({
  selector: 'app-task-list-component',
  templateUrl: './task-list-component.component.html',
  styleUrls: ['./task-list-component.component.scss']
})
export class TaskListComponentComponent implements OnInit {
  @Input() task_list:Task[] = []
  @Input() show_inbox:boolean = true
  @ViewChild('rescheduleicon') reschedule_icon!: ElementRef;
  @Output() new_task_list_func = new EventEmitter()
  @Output() reschedule_task = new EventEmitter()
  calendarPosition = { top: '0px', left: '0px' };
  calendar_open=false
  current_selected_task:Task

  constructor() { }

  ngOnInit() {
  }

  calendar_open_func(index) {
    this.calendar_open = !this.calendar_open;
    if (this.calendar_open) {
      const icon_element = document.getElementById('task'+index);
      const button_rect = icon_element.getBoundingClientRect();
      console.log(button_rect)
      this.calendarPosition.top = `${button_rect.bottom - 41}px`;    //need to make this better.
      this.calendarPosition.left = `${button_rect.left-273}px`;
      // this.calendarPosition.right = `${button_rect.right}px`
    }
  }

  complete_task(task: Task, index: number) {
    console.log(task)
    const taskElement = document.getElementById(`task${task.id}`);
    
    if (taskElement) {
        // Add the slide-out class to trigger the keyframe animation
        taskElement.classList.add('slide-out');
        
        // Listen for the animationend event
        taskElement.addEventListener('animationend', () => {
            let new_task_list = JSON.parse(localStorage.getItem('task_list'));
            new_task_list = new_task_list.filter(obj=> obj.id != task.id)
            localStorage.setItem('task_list', JSON.stringify(new_task_list));
            this.new_task_list_func.emit(task)
        });
    }
  }

  date_to_show(date_obj){
    console.log(date_obj)
    let rescudule_obj = {"task": this.current_selected_task, "date":date_obj}
    console.log(rescudule_obj)
    this.reschedule_task.emit(rescudule_obj)
  }

  task_clicked(task_obj){
    console.log(task_obj)
    this.current_selected_task = task_obj
  }


}

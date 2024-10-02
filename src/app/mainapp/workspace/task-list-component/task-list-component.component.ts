import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-task-list-component',
  templateUrl: './task-list-component.component.html',
  styleUrls: ['./task-list-component.component.scss']
})
export class TaskListComponentComponent implements OnInit {
  @Input() task_list:[] = []
  @Input() show_inbox:boolean = true
  @ViewChild('rescheduleicon', { static: false }) reschedule_icon!: ElementRef;
  calendarPosition = { top: '0px', left: '0px' };
  calendar_open=false

  constructor() { }

  ngOnInit() {
  }

  calendar_open_func(index) {
    this.calendar_open = !this.calendar_open;
    if (this.calendar_open) {
      const icon_element = document.getElementById('task'+index);
      const button_rect = icon_element.getBoundingClientRect();
      console.log(button_rect)
      this.calendarPosition.top = `${button_rect.bottom - 41}px`;
      this.calendarPosition.left = `${button_rect.left-273}px`;
      // this.calendarPosition.right = `${button_rect.right}px`
    }
  }

}

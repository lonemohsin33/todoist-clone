import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-list-component',
  templateUrl: './task-list-component.component.html',
  styleUrls: ['./task-list-component.component.scss']
})
export class TaskListComponentComponent implements OnInit {
  @Input() task_list:[] = []

  constructor() { }

  ngOnInit() {
  }

}

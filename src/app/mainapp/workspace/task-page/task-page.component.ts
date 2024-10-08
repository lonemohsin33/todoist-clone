import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.scss']
})
export class TaskPageComponent implements OnInit {
  show_navbar:boolean = true
  task_count:{} = {"Inbox": 0, "Upcoming":0, "Today": 0}

  ngOnInit() {
  }

  recieve_collapse_event(event){
    console.log(event)
    this.show_navbar = event
  }

}

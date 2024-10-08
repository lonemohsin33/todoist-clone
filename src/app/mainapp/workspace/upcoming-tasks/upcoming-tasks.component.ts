import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upcoming-tasks',
  templateUrl: './upcoming-tasks.component.html',
  styleUrls: ['./upcoming-tasks.component.scss']
})
export class UpcomingTasksComponent implements OnInit {
  show_navbar:boolean = true
  constructor() { }

  ngOnInit() {
  }

  recieve_collapse_event(event){
    console.log(event)
    this.show_navbar = event
  }

}

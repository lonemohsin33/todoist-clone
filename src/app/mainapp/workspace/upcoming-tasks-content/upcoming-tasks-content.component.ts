import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-upcoming-tasks-content',
  templateUrl: './upcoming-tasks-content.component.html',
  styleUrls: ['./upcoming-tasks-content.component.scss']
})
export class UpcomingTasksContentComponent implements OnInit {
  @Input() show_navbar:Boolean = true

  is_hovered:boolean = false


  constructor() { }

  ngOnInit() {
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

}

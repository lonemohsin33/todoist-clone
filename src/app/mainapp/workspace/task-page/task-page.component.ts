import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.scss']
})
export class TaskPageComponent implements OnInit {
  show_navbar:boolean = true

  ngOnInit() {
  }

  recieve_collapse_event(event){
    console.log(event)
    this.show_navbar = event
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {
  show_navbar:boolean = true
  constructor() { }

  ngOnInit() {
  }

  recieve_collapse_event(event){
    console.log(event)
    this.show_navbar = event
  }

}

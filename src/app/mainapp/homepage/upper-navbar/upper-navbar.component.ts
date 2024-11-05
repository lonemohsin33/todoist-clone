import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upper-navbar',
  templateUrl: './upper-navbar.component.html',
  styleUrls: ['./upper-navbar.component.scss']
})
export class UpperNavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  open_nav_menu(){
    console.log('nav menu clicked')
  }

}

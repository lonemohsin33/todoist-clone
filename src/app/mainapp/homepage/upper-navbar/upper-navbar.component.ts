import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upper-navbar',
  templateUrl: './upper-navbar.component.html',
  styleUrls: ['./upper-navbar.component.scss']
})
export class UpperNavbarComponent implements OnInit {

  close_upper_nav = false

  constructor() { }

  ngOnInit(): void {
  }

  open_nav_menu() {
    this.close_upper_nav = !this.close_upper_nav; // Open the overlay
}

}

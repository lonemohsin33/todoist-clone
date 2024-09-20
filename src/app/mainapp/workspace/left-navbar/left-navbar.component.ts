import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
// import { stat } from 'fs';

@Component({
  selector: 'app-left-navbar',
  templateUrl: './left-navbar.component.html',
  styleUrls: ['./left-navbar.component.scss'],
  // animations: [
  //   trigger('nav_open_close', [
  //     state('open', style({
  //       opacity: '1'
  //     })),
  //     state('close', style({
  //       opacity:'0'

  //     })),
  //     transition('open => closed', [animate('1s ease-out')]),
  //     transition('closed => open', [animate('1s ease-out')])

  //   ])
  // ]
})
export class LeftNavbarComponent implements OnInit {
  @Output() toggle_navbar = new EventEmitter()

  constructor(
  private router:Router
  ) { }
  items = [{"name": "Add task", "icon": 'bi bi-plus-circle-fill', 'class':'task-class', "value":""}, {"name": "Search", "icon": 'bi bi-search', 'color':'',"value":"2" }, {"name": "inbox", "icon": 'bi bi-inbox', 'color':'',"value":"3", 'route': '/workspace/inbox'},{"name": "Today", "icon": 'bi bi-calendar2-day', 'color':'',"value":"3", 'route': '/workspace/today'}, {"name": "Upcoming", "icon": 'bi bi-calculator', 'color':'', "value":"4"}, {"name": "Filters & Labels", "icon": 'bi bi-filter', 'color':'',"value":""}]

  my_projects = [
    {
      "name": "Office", "icon": "bi bi-hash", "class": "", "value": ""
    }
  ]
  hide_project_div = false
  hide_team_div = false
  chevron_class = 'bi bi-chevron-down'
  background_color = ''
  selected_item : number| null = null
  is_collapsed : boolean = true
  ngOnInit() {
  }

  toggle_items_list(list_name){
    if (list_name=='projects'){
      this.hide_project_div = !this.hide_project_div
      if (this.hide_project_div){
        this.chevron_class = 'bi bi-chevron-right'
      }else{
        this.chevron_class = 'bi bi-chevron-down'
      }
    }
    else if (list_name =='teams'){
      this.hide_team_div = !this.hide_team_div
      if (this.hide_team_div){
        this.chevron_class = 'bi bi-chevron-right'
      }else{
        this.chevron_class = 'bi bi-chevron-down'
      }

    }

  }

  item_click(item, i){
    if (this.selected_item !== null) {
      document.getElementById(`item${this.selected_item}`).style.backgroundColor = '#F5EEE3'
    }
    document.getElementById(`item${i}`).style.backgroundColor = '#fffdf6'
    this.selected_item = i
    this.router.navigate([`${item.route}`])
  }

  collapse_navbar(){
    this.is_collapsed = !this.is_collapsed
    this.toggle_navbar.emit(this.is_collapsed)
  }

}

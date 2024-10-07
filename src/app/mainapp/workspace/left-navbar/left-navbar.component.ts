import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
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
  @Input() task_counts:{} = {"Inbox": 0, "Upcoming":0, "Today": 0}

  constructor(
  private router:Router, private cdr: ChangeDetectorRef
  ) { }
  items = [{"name": "Add task", "icon": 'bi bi-plus-circle-fill', 'class':'task-class', "value":""}, {"name": "Search", "icon": 'bi bi-search', 'color':'',"value":"0" }, {"name": "Inbox", "icon": 'bi bi-inbox', 'color':'',"value":"0", 'route': '/workspace/inbox'},{"name": "Today", "icon": 'bi bi-calendar2-day', 'color':'',"value":"0", 'route': '/workspace/today'}, {"name": "Upcoming", "icon": 'bi bi-calculator', 'color':'', "value":"", 'route':'/workspace/upcoming'}, {"name": "Filters & Labels", "icon": 'bi bi-filter', 'color':'',"value":""}]

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
  today_task_count=0
  task_list_count =0
  upcoming_task_count =0
  ngOnInit() {
    this.filter_tasks_and_set_counts()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.task_counts && this.task_counts) {
      console.log(changes)
      this.update_task_counts();
      this.cdr.detectChanges();
    }
  }

  filter_tasks_and_set_counts(){
    let all_tasks = JSON.parse(localStorage.getItem('task_list')||'[]')
    console.log(all_tasks)
    all_tasks.map((task_item)=>{
      if (task_item.day_diff <=0){
        this.today_task_count+=1
      }else if (task_item.day_diff>=1){
        this.upcoming_task_count+=1
      }
    })
    this.items[2].value = String(all_tasks.length)
    this.items[3].value = String(this.today_task_count)
    this.items[4].value = String(this.upcoming_task_count)

  }



  private update_task_counts() {
    // Update the value in items based on task_counts
    let included_list = ['Inbox', 'Upcoming', 'Today']
    this.items.forEach(item => {
      if (!included_list.includes(item.name)) {
        return; // Skip to the next iteration if not included
      }
      if (this.task_counts[item.name] !== undefined) {
        item.value = this.task_counts[item.name].toString(); // Convert number to string
      }
    });
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

import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../../../mainapp/workspace/task-card/interfaces';
import { InboxContentComponent } from '../../../mainapp/workspace/inbox-content/inbox-content.component';
import { MatDialog } from '@angular/material';
import { TaskCardComponent } from 'src/app/mainapp/workspace/task-card/task-card.component';
import { TaskCardExplicitComponent } from '../../task-card-explicit/task-card-explicit.component';
// import { stat } from 'fs';
declare var $: any;;

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
  @ViewChild(InboxContentComponent) inbox_content_comp:InboxContentComponent

  constructor(
  private router:Router, private cdr: ChangeDetectorRef,private dialog: MatDialog
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
  is_visible : boolean = true
  today_task_count=0
  task_list_count =0
  upcoming_task_count =0
  show_task_card:boolean = true
  task_list: Task[] = JSON.parse(localStorage.getItem("task_list"))|| []
  date_extended = {}
  task_card_div=false
  overdue_task_count  
  total_task_count

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
  // toggle_items_list(key: 'hide_project_div' | 'hide_team_div') {
  //   this[key] = !this[key];
  //   this.chevron_class = this[key] ? 'bi bi-chevron-down' : 'bi bi-chevron-right';
  // }

  item_click(item, i){
    this.task_card_div=false
    if (this.selected_item !== null) {
      document.getElementById(`item${this.selected_item}`).style.backgroundColor = '#F5EEE3'
    }
    document.getElementById(`item${i}`).style.backgroundColor = '#fffdf6'
    this.selected_item = i
    if (item.name === 'Add task'){
      console.log(this.show_task_card)
      this.task_card_div=!this.task_card_div
      // this.show_task_card = true
      // this.open_task_card_dialog()  
    }else if (item.name ==='Search'){
    }else if (item.name === 'Filters & Labels'){
    }
    else{
      this.router.navigate([`${item.route}`])
    }
  }

  collapse_navbar(){
    this.is_visible = !this.is_visible
    this.toggle_navbar.emit(this.is_visible)
  }

  show_card(event){
    console.log(event)
    this.task_card_div = event
  }

  date_event(event){
    this.date_extended = event
  }

  add_new_task(task:Task){
    this.task_list.push(task)
    console.log(this.task_list)
    localStorage.setItem("task_list", JSON.stringify(this.task_list))
    this.count_tasks(task)
    // this.task_count.emit({"Today":this.today_task_count + this.overdue_task_count, "Inbox": this.total_task_count, "Upcoming": this.upcoming_task_count})
    this.show_task_card = false
  }

  count_tasks(task:Task){
    if (task.day_diff==0){
      this.today_task_count+=1
    }else if (task.day_diff<0){
      this.overdue_task_count+=1
    }else if (task.day_diff>=1){
      this.upcoming_task_count+=1
    }
    this.total_task_count+=1
  }

  // open_task_card_dialog(): void {
  //   console.log("i am here")
  //   const dialogRef = this.dialog.open(TaskCardExplicitComponent, {
  //     // position:{
  //     //   // 'top': '50%',
  //     //   // 'right': '50%'
  //     // },
  //     // // width: '600px',  // Adjust width as needed
  //     // panelClass:'centered-task-div'
  //   });
  //   // dialogRef.componentInstance.show_card=true
  //   // console.log(dialogRef.componentInstance.show_card)
    

  //   // Handle dialog close event
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       console.log('Task Added:', result);
  //       // Handle added task logic here
  //     }
  //   });
  // }

}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeftNavbarComponent } from './left-navbar/left-navbar.component';
import { TaskPageComponent } from './task-page/task-page.component';
import { InboxComponent } from './inbox/inbox.component';
import { UpcomingTasksComponent } from './upcoming-tasks/upcoming-tasks.component';


const routes: Routes = [
  {
    path:'',
    component:LeftNavbarComponent
  },
  {
    path:'today',
    component:TaskPageComponent
  },
  {
    path:'inbox',
    component:InboxComponent
  },
  {
    path:'upcoming',
    component:UpcomingTasksComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceRoutingModule { }

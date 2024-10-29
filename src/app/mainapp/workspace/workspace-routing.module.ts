import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskPageComponent } from './task-page/task-page.component';
import { InboxComponent } from './inbox/inbox.component';
import { UpcomingTasksComponent } from './upcoming-tasks/upcoming-tasks.component';


const routes: Routes = [
  { path: '', redirectTo: 'today', pathMatch: 'full' },
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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkspaceRoutingModule } from './workspace-routing.module';
import { TaskPageComponent } from './task-page/task-page.component';
import { InboxComponent } from './inbox/inbox.component';
import { TaskCardComponent } from './task-card/task-card.component';
import { FormsModule } from '@angular/forms';
import { TaskListComponentComponent } from './task-list-component/task-list-component.component';
import { SharedComponentsModule } from 'src/app/shared-components/shared-components.module';
import { TodayComponent } from './today/today.component';
import { InboxContentComponent } from './inbox-content/inbox-content.component';
import { UpcomingTasksComponent } from './upcoming-tasks/upcoming-tasks.component';
import { UpcomingTasksContentComponent } from './upcoming-tasks-content/upcoming-tasks-content.component';
import { NavbarModule } from 'src/app/shared-components/navbar/navbar.module';
import { MatDialogModule, MatDialogRef } from '@angular/material';



@NgModule({
  declarations: [TaskPageComponent, InboxComponent, TaskCardComponent, TaskListComponentComponent, TodayComponent, InboxContentComponent, UpcomingTasksComponent, UpcomingTasksContentComponent],
  imports: [
    CommonModule,
    WorkspaceRoutingModule,
    FormsModule,
    SharedComponentsModule,
    // NavbarModule,
    // MatDialogRef,
    // MatDialogModule
  ]
})
export class WorkspaceModule { }

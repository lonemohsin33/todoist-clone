import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftNavbarComponent } from './left-navbar/left-navbar.component';
import { WorkspaceRoutingModule } from './workspace-routing.module';
import { TaskPageComponent } from './task-page/task-page.component';
import { InboxComponent } from './inbox/inbox.component';
import { TaskCardComponent } from './task-card/task-card.component';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { TaskListComponentComponent } from './task-list-component/task-list-component.component';
import { SharedComponentsModule } from 'src/app/shared-components/shared-components.module';
import { TodayComponent } from './today/today.component';
import { InboxContentComponent } from './inbox-content/inbox-content.component';
import { UpcomingTasksComponent } from './upcoming-tasks/upcoming-tasks.component';



@NgModule({
  declarations: [LeftNavbarComponent, TaskPageComponent, InboxComponent, TaskCardComponent, TaskListComponentComponent, TodayComponent, InboxContentComponent, UpcomingTasksComponent],
  imports: [
    CommonModule,
    WorkspaceRoutingModule,
    FormsModule,
    SharedComponentsModule
  ]
})
export class WorkspaceModule { }

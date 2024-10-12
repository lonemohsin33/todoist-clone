import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedComponentsRoutingModule } from './shared-components-routing.module';
import { NgbDatepickerModule, NgbModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CalenderComponentComponent } from './calender-component/calender-component.component';
import { WorkspaceModule } from '../mainapp/workspace/workspace.module';
import { MatDialogModule } from '@angular/material';
import { TaskCardExplicitComponent } from './task-card-explicit/task-card-explicit.component';

const components = [CalenderComponentComponent,TaskCardExplicitComponent]
@NgModule({
  declarations: [CalenderComponentComponent, TaskCardExplicitComponent],
  imports: [
    CommonModule,
    SharedComponentsRoutingModule,
    FormsModule,
    NgbModule,
    MatDialogModule
  ],
  exports: components
})
export class SharedComponentsModule { }

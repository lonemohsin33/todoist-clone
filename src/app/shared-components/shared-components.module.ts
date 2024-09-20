import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedComponentsRoutingModule } from './shared-components-routing.module';
import { TimePickerComponentComponent } from './time-picker-component/time-picker-component.component';
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [TimePickerComponentComponent],
  imports: [
    CommonModule,
    SharedComponentsRoutingModule,
    NgbTimepickerModule,
    FormsModule
  ]
})
export class SharedComponentsModule { }

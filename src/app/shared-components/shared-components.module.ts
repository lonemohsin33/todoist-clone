import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedComponentsRoutingModule } from './shared-components-routing.module';
import { NgbDatepickerModule, NgbModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CalenderComponentComponent } from './calender-component/calender-component.component';

const components = [CalenderComponentComponent]
@NgModule({
  declarations: [CalenderComponentComponent],
  imports: [
    CommonModule,
    SharedComponentsRoutingModule,
    FormsModule,
    NgbModule
  ],
  exports: components
})
export class SharedComponentsModule { }

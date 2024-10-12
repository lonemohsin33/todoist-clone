import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftNavbarComponent } from './left-navbar/left-navbar.component';
import { MatDialogModule } from '@angular/material';
import { SharedComponentsModule } from '../shared-components.module';



@NgModule({
  declarations: [LeftNavbarComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    SharedComponentsModule
    
  ],
  exports:[LeftNavbarComponent]
})
export class NavbarModule { }

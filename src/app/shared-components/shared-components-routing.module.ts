import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskCardExplicitComponent } from './task-card-explicit/task-card-explicit.component';


const routes: Routes = [
  {
    path:'',
    component:TaskCardExplicitComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedComponentsRoutingModule { }

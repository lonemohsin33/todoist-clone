import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageModule } from './mainapp/homepage/homepage.module';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'sessions',
    loadChildren: ()=> import('./mainapp/login/login.module').then(m=>m.LoginModule)
  },
  {
    path: 'home', 
    loadChildren: () => import('./mainapp/homepage/homepage.module').then(m => m.HomepageModule)

  },
  {
    path:'workspace',
    loadChildren: () => import('./mainapp/workspace/workspace.module').then(m => m.WorkspaceModule)
  },
  {
    path:'shared',
    loadChildren: () => import('./shared-components/shared-components.module').then(m => m.SharedComponentsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, scrollPositionRestoration: 'enabled', enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

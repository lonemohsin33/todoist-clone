import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RouterModule, Routes } from '@angular/router';
import { UpperNavbarComponent } from './upper-navbar/upper-navbar.component';
import { HomePageContentComponent } from './home-page-content/home-page-content.component';
import { FooterComponent } from './footer/footer.component';
import { FeaturesComponent } from './features/features.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'features',
    component: FeaturesComponent
  }
];

@NgModule({
  declarations: [LandingPageComponent, UpperNavbarComponent, HomePageContentComponent, FooterComponent, FeaturesComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomepageModule { }

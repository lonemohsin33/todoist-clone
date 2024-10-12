import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LeftNavbarComponent } from './shared-components/navbar/left-navbar/left-navbar.component';
import { NavbarModule } from './shared-components/navbar/navbar.module';
import { MatDialogModule } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NavbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

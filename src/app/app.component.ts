import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TODO-APP';
  navbar_visible = true;

  toggle_navbar(visible: boolean) {
    this.navbar_visible = visible;
  }
}

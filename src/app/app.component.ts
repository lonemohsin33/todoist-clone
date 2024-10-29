import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TODO-APP';
  navbar_visible = true;
  disable_navbar = false
  
  constructor(private router: Router) {}

  ngOnInit(): void {
    // Listen for route changes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        // Check if the current route starts with 'workspace'
        this.disable_navbar = event.urlAfterRedirects.startsWith('/workspace');
      });
  }

  toggle_navbar(visible: boolean) {
    this.navbar_visible = visible;
  }
}

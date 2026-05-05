import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  isVisible: boolean = false;

  toggleDropDown(): void {
    this.isVisible = !this.isVisible;
  }
}
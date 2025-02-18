import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'project';
  isCollapsed: boolean = false; // تعريف الخاصية

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed; // تبديل الحالة
  }
}

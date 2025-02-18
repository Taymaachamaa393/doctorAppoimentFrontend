import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})

export class SidebarComponent {
  @Input() role: string = ''; // لتحديد الدور (doctor, admin, user)

  isCollapsed: boolean = false; // حالة الشريط (منشور أو مطوي)

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed; // تبديل الحالة
  }

  logout(): void {
    console.log('Logout clicked'); // يمكنك استبدال هذا بدالة تسجيل الخروج الفعلية
  }
}

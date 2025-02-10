// notifications.component.ts

import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../services/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications: any[] = []; // لتخزين الإشعارات التي تم جلبها
  errorMessage: string | null = null; // لتخزين رسائل الخطأ

  constructor(private notificationsService: NotificationsService) {}

  ngOnInit(): void {
    this.notificationsService.getNotifications().subscribe(
      (data) => {
        this.notifications = data; // تعيين البيانات التي تم جلبها إلى المتغير
      },
      (error) => {
        console.error('Error fetching notifications:', error);
        this.errorMessage = 'Failed to load notifications. Please try again later.';
      }
    );
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationsService } from '../../../services/notifications.service';
import { DoctorService } from '../../../services/doctor.service';
import { DoctorResponse } from '../../../services/doctor.service';// استيراد الواجهة
import { AuthService } from '../../../services/auth.service';
import { NgForm } from '@angular/forms'; // تأكد من استيراد NgForm
import { Observable } from 'rxjs';
import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-available-appointments',
  templateUrl: './available-appointments.component.html',
  styleUrl: './available-appointments.component.css'
})
export class AvailableAppointmentsComponent implements OnInit{
    
  @ViewChild('appointmentForm') appointmentForm!: NgForm; 

  notifications: string[] = [];
  appointments: any[] = []; // لتخزين المواعيد
  availableAppointments: any[] = []; // لتخزين المواعيد
  patients: any[] = []; // لتخزين بيانات المرضى
  doctorName: string = ''; // لتخزين اسم الطبيب
  doctorId: number = 0; // معرف الدكتور
  selectedDoctorId: string = '';
  newAppointment: { date: NgbDateStruct | null; time: NgbTimeStruct | null } = {
    date: null,
    time: { hour: 12, minute: 0, second: 0 } // وقت افتراضي
  };
  errorMessage: string = ''; // لتخزين رسالة الخطأ
  successMessage: string = ''; // لتخزين رسالة النجاح

  constructor(
    private notificationsService: NotificationsService,
    private doctorService: DoctorService,
    private authService: AuthService, // لإدارة التوكن
    private router: Router,
  ) {}

  ngOnInit(): void {
   
    // الحصول على معرف الدكتور الحالي
    const currentUser = this.authService.getCurrentUser();
    console.log('Current User:', currentUser);

  if (currentUser && currentUser.id) {
    this.doctorId = currentUser.id;
    this.loadAppointments(this.doctorId);
  } else {
    console.error('User data is not available.');
  }

  }
  


    // جلب المواعيد المحجوزة للدكتور
    loadAppointments(doctorId: number): void {
      this.doctorService.getDoctorAppointments(doctorId).subscribe(
        (data) => {
          this.availableAppointments = data; // تخزين المواعيد في المتغير
        },
        (error) => {
          console.error('Error fetching appointments:', error);
        }
      );
    }
    
}
    
    






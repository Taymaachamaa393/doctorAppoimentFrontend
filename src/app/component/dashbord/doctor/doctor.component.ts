import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../../../services/notifications.service';
import { AppointmentsService } from '../../../services/appointments.service';
import { PatientsService } from '../../../services/patients.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.css'
})
export class DoctorComponent implements OnInit{

  notifications: string[] = [];
  appointments: any[] = [];
  patients: string[] = [];
  newAppointment = { date: '', time: '', patient: '' };

  constructor(
    private notificationsService: NotificationsService,
    private appointmentsService: AppointmentsService,
    private patientsService: PatientsService,
    private authService: AuthService // لإدارة التوكن
  ) {}

  ngOnInit(): void {
    this.getNotifications();
    this.getAppointments();
    this.getPatients();
  }

  getNotifications(): void {
    this.notificationsService.getNotifications().subscribe(
      (data) => {
        this.notifications = data;
      },
      (error) => {
        console.error('Error fetching notifications:', error);
      }
    );
  }

  getAppointments(): void {
    this.appointmentsService.getAppointments().subscribe(
      (data) => {
        this.appointments = data;
      },
      (error) => {
        console.error('Error fetching appointments:', error);
      }
    );
  }

  getPatients(): void {
    this.patientsService.getPatients().subscribe(
      (data) => {
        this.patients = data;
      },
      (error) => {
        console.error('Error fetching patients:', error);
      }
    );
  }

  addAppointment(): void {
    if (this.newAppointment.date && this.newAppointment.time && this.newAppointment.patient) {
      this.appointmentsService.addAppointment(this.newAppointment).subscribe(
        (data) => {
          this.appointments.push(data); // إضافة الموعد إلى القائمة
          this.newAppointment = { date: '', time: '', patient: '' }; // مسح البيانات بعد الإضافة
        },
        (error) => {
          console.error('Error adding appointment:', error);
        }
      );
    }
  }
}



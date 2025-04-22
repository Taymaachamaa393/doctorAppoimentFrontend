import { Component, OnInit } from '@angular/core';
import { PatientsService } from '../../../services/patients.service';
import { DoctorService } from '../../../services/doctor.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-appointments-patients',
  templateUrl: './appointments-patients.component.html',
  styleUrl: './appointments-patients.component.css',
  providers: [DatePipe]
})
export class AppointmentsPatientsComponent implements OnInit {

  appointments: any[] = [];  // Array to hold the appointment data
  loading = true;            // Variable to handle loading state
  doctors: any[] = [];  // تعريف المتغيرات الخاصة بالأطباء
  patients: any[] = [];  // تعريف المتغيرات الخاصة بالمرضى

  constructor(
    private patientsService: PatientsService,
    private doctorService: DoctorService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.fetchAppointments(); // جلب المواعيد
    this.fetchDoctors();      // جلب بيانات الأطباء
  }
  // getDoctorById

    // جلب المواعيد
  fetchAppointments(): void {
    this.patientsService.getAppointments().subscribe(
      (response) => {
        this.appointments = response.appointments;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching appointments:', error);
        this.loading = false;
      }
    );
  }

 

  fetchDoctors(): void {
    this.doctorService.getDoctors().subscribe(
      (response) => {
        this.doctors = response; // تخزين بيانات الأطباء
      },
      (error) => {
        console.error('Error fetching doctors:', error);
      }
    );
  } 

    // الحصول على اسم الطبيب بناءً على doctor_id
    getDoctorName(doctorId: number): string {
      const doctor = this.doctors.find((d) => d.id === doctorId);
      return doctor ? doctor.name : 'Unknown Doctor';
    }

  // تنسيق الوقت بشكل صحيح
    formatAppointmentTime(time: string): string {
    // تحويل الوقت من 'HH:mm:ss' إلى تنسيق الوقت
    const timeArray = time.split(':');
    const date = new Date();
    date.setHours(+timeArray[0], +timeArray[1], +timeArray[2]);
    return date.toLocaleTimeString();  // إرجاع الوقت في التنسيق المحلي
  }
}

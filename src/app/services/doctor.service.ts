import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 
import { Doctor } from '../models/doctor.model';
import { AuthService } from './auth.service';


export interface DoctorResponse {
  doctor: string;
  patients: any[];
}



@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiUrl = 'https://api-doctor.clingroup.net/api/doctor';


    // /available-appointments/id    المواعيد  الغير محجوزة  عند لدكتور
    // id/ratings
    // s/search?r
    // s
   
    
  constructor(private http: HttpClient, private authService: AuthService) {}

  // جلب جميع الأطباء
  // getDoctors(): Observable<Doctor[]> {
  //   return this.http.get<Doctor[]>(this.apiUrl);
  // }
   
    // الحصول على مواعيد المحجوزة وغير المحجوزة الدكتور الحالي
    getMyAppointments(): Observable<any[]> {
      return this.http.get<any>(`${this.apiUrl}/my-appointments`).pipe(
        map(response => response.appointments) // استخراج المصفوفة من الاستجابة
      );
    }

   //  إنشاء موعد جديد (المواعيد غير المحجوزة)
    createAppointment(appointmentData: any): Observable<any> {
     return this.http.post(
       `${this.apiUrl}/create-appointment`,
       {
         appointment_date: appointmentData.appointment_date,  
         appointment_time: appointmentData.appointment_time,
       }
     );
    }
      //   الحصول على جميع مواعيد الغير محجوزة الدكتور
    getDoctorAppointments(doctorId: number): Observable<any[]> {
      return this.http.get<any>(`${this.apiUrl}/available-appointments/${doctorId}`).pipe(
        map(response => response.appointments) // استخراج المصفوفة من الاستجابة
      );
    }

   //  الحصول على جميع المرضى 
    getDoctorPatients(doctorId: number): Observable<DoctorResponse> {
      return this.http.get<DoctorResponse>(`${this.apiUrl}/patients`);
    }


    // دالة لحذف الموعد
    deleteAppointment(appointmentId: number): Observable<any> {
       return this.http.delete(`${this.apiUrl}/appointments/${appointmentId}`);
    }
  
}
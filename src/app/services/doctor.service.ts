import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 
import { Doctor } from '../models/doctor.model';
import { DoctorPublic } from '../models/doctor.model';
import { AuthService } from './auth.service';
import { RatingService } from './rating.service';

 
export interface Patient {
  patient_id: number; // معرف المريض
  patient_name: string; // اسم المريض
  appointment_date: string; // تاريخ الموعد (YYYY-MM-DD)
  appointment_time: string; // وقت الموعد (HH:mm:ss)
}

export interface ApiResponse {
  doctor: string; // اسم الطبيب
  patients: Patient[]; // قائمة المرضى
}

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiUrl = 'https://api-doctor.clingroup.net/api/doctor';
    
  constructor(private http: HttpClient, private authService: AuthService, ratingService: RatingService) {}
   

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
    // getDoctorPatients(doctorId: number): Observable<DoctorResponse> {
    //   return this.http.get<DoctorResponse>(`${this.apiUrl}/patients`);
    // }
    getPatients(): Observable<ApiResponse> {
      return this.http.get<ApiResponse>(`${this.apiUrl}/patients`);
    }



    // دالة لحذف الموعد
    deleteAppointment(appointmentId: number): Observable<any> {
       return this.http.delete(`${this.apiUrl}/appointments/${appointmentId}`);
    }

  
    getDoctors(): Observable<Doctor[]> {
       return this.http.get<{ doctors: Doctor[] }>(`${this.apiUrl}s`).pipe(
        map(response => 
          response.doctors.map(doctor => ({
            ...doctor,
            certificate_url: `https://api-doctor.clingroup.net/storage/${doctor.certificate_path}`
          }))
        )
      );
    }

  //  أضف هذه الدالة لجلب بيانات طبيب معين
  // getDoctorById(doctorId: number): Observable<DoctorPublic> {
  //   return this.http.get<DoctorPublic>(`${this.apiUrl}/${doctorId}`);
  // }


     //  جلب جميع الأطباء وتصفيتهم في Frontend (إذا لم يكن هناك API خاص)
    // 📌 الحل: بدلًا من جلب طبيب واحد من الـ API، نقوم بجلب قائمة الأطباء ثم نبحث عن الطبيب المطلوب.
    getDoctorById(doctorId: number): Observable<DoctorPublic | undefined> {
      return this.getDoctors().pipe(
        map((doctors: DoctorPublic[]) => doctors.find(doc => doc.id === doctorId))
      );
    }
    // getPatientById(patientId: number): Observable<DoctorResponse | undefined> {
    //   return this.getDoctors().pipe(
    //     map((patients: DoctorResponse[]) => doctors.find(doc => doc.id === patientId))
    //   );
    // }
    
}


 

 

























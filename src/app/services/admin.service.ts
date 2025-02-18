import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor } from '../models/doctor.model';
import { map } from 'rxjs/operators'; 
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'https://api-doctor.clingroup.net/api/admin'; 

  constructor(private http: HttpClient, private authService: AuthService) {}


  // جلب قائمة الأطباء المعلقين
  // getPendingDoctors(): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/pending-doctors`);
  // }

  // selectDoctor(doctor: Doctor): void {
  //   this.selectedDoctor = {
  //     ...doctor,
  //     profileImageUrl: `http://api-doctor.clingroup.net/storage/${doctor.certificate_path}`
  //   };
  // }
   // جلب جميع الأطباء
  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.apiUrl);
  }
  getPendingDoctors(): Observable<Doctor[]> {
    return this.http.get<{ doctors: Doctor[] }>(`${this.apiUrl}/pending-doctors`).pipe(
      map(response => response.doctors) // استخراج المصفوفة فقط
    );
  }
 
  // عرض شهادة طبيب معين
  getDoctorCertificate(doctorId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/doctor/${doctorId}/certificate`);
  }

  // الموافقة على طبيب
  verifyDoctor(doctorId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify-doctor/${doctorId}`, {});
  }

  // رفض طلب طبيب
  rejectDoctor(doctorId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/reject-doctor/${doctorId}`);
  }

 
  //  getPendingDoctors(): Observable<Doctor[]> {
  //     return this.http.get<{ doctors: Doctor[] }>(`${this.apiUrl}/pending-doctors`).pipe(
  //       map((response: { doctors: Doctor[] }) => response.doctors) //  استخراج المصفوفة تلقائيًا
  //     );
  //   }

 
 


      }

  

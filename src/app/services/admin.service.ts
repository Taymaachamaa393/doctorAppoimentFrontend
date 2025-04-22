import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor } from '../models/doctor.model';
import { map } from 'rxjs/operators'; 
import { AuthService } from './auth.service';
import { DoctorCertificateResponse } from '../models/doctor.model';



@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'https://api-doctor.clingroup.net/api/admin'; 

  constructor(private http: HttpClient, private authService: AuthService) {}


  // getDoctors(): Observable<Doctor[]> {
  //   return this.http.get<Doctor[]>(this.apiUrl);
  // }


  
  // getDoctors(): Observable<Doctor[]> {
  //   return this.http.get<{ doctors: Doctor[] }>(this.apiUrl).pipe(
  //     map(response => 
  //       response.doctors.map(doctor => ({
  //         ...doctor,
  //         certificate_url: `https://api-doctor.clingroup.net/storage/${doctor.certificate_path}`
  //       }))
  //     )
  //   );
  // }
  
     //  طلب جلب جميع المقدمين من الأطباء  
  getPendingDoctors(): Observable<Doctor[]> {
    return this.http.get<{ doctors: Doctor[] }>(`${this.apiUrl}/pending-doctors`).pipe(
      map(response => response.doctors) // استخراج المصفوفة فقط
    );
  }
 
  // دالة لجلب شهادة الطبيب
  // getDoctorCertificate(doctorId: number): Observable<DoctorCertificateResponse> {
  //   return this.http.get<DoctorCertificateResponse>(`${this.apiUrl}/${doctorId}/certificate`);
  // }
  getDoctorCertificate(doctorId: number): Observable<string> {
    return this.http.get<{ doctor: { certificate_url: string } }>(
      `${this.apiUrl}/doctor/${doctorId}/certificate`
    ).pipe(
      map(response => response.doctor.certificate_url) // استخراج الرابط فقط
    );
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

  

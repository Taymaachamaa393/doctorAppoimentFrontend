import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../models/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  private apiUrl = 'http://api-doctor.clingroup.net/api/doctor'; // الرابط المعدل ليناسب Laravel

  constructor(private http: HttpClient) {}


  // جلب مواعيد الطبيب
  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrl}/my-appointments`);
  }

  // إضافة موعد جديد
  addAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(`${this.apiUrl}/create-appointment`, appointment);
  }

  // حذف موعد
  deleteAppointment(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/appointments/${id}`);
  }

}

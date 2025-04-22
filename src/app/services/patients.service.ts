import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AppointmentRequest, AppointmentResponse} from '../models/Patient.model';

// import { environment } from 'src/environments/environment'; // تأكد من استخدام البيئة الخاصة بك


interface AppointmentPatients {
  id: number;
  doctor_id: number;
  patient_id: number;
  appointment_date: string;
  appointment_time: string;
  is_available: number;
  created_at: string;
  updated_at: string;
}


@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  
  private apiUrl = 'https://api-doctor.clingroup.net/api/patient';  
  // private apiUrlPatients = 'https://api-doctor.clingroup.net/api/patients';  

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Function to fetch appointments
  getAppointments(): Observable<{ appointments: AppointmentPatients[] }> {
    return this.http.get<{ appointments:AppointmentPatients[] }>(`${this.apiUrl}/appointments`);
  }

//   bookAppointment(appointmentId: number, appointmentData: AppointmentRequest): Observable<AppointmentResponse> {
//     return this.http.post<AppointmentResponse>(`${this.apiUrl}/book-appointment/${appointmentId}`, appointmentData);
//   }

// }


  // حجز موعد
  bookAppointment(appointmentId: number, appointmentData: AppointmentRequest): Observable<any> {
    const url = `${this.apiUrl}/book-appointment/${appointmentId}`;
    return this.http.post(url, appointmentData);
  }
}









  


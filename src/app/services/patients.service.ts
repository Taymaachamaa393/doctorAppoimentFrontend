import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  // private apiUrl = 'https://api-doctor.clingroup.net/api/doctor';

  constructor(private http: HttpClient, private authService: AuthService) { }

 
  
  // getPatients(): Observable<string[]> {
    // return this.http.get<string[]>(`${this.apiUrl}/patients`, {
    //   headers: this.getHeaders()
    // });
    // return this.http.get<string[]>(`${this.apiUrl}/patients`
  // );
// }
}

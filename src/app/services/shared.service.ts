import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DoctorPublic } from '../models/doctor.model';
import { map } from 'rxjs/operators'; 


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  
  private apiUrl = 'https://api-doctor.clingroup.net/api/doctors';  


  constructor(private http: HttpClient) {}

  // getDoctors(): Observable<Doctor[]> {
  //   return this.http.get<Doctor[]>(this.apiUrl);
  // }

  getDoctors(): Observable<DoctorPublic[]> {
    return this.http.get<{ doctors: DoctorPublic[] }>(this.apiUrl).pipe(
      map(response => 
        response.doctors.map(doctor => ({
          ...doctor,
          certificate_url: `https://api-doctor.clingroup.net/storage/${doctor.certificate_path}`
        }))
      )
    );
  }
}


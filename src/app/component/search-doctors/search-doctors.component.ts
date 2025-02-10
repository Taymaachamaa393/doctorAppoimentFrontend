import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Doctor } from '../../models/doctor.model';

@Component({
  selector: 'app-search-doctors',
  templateUrl: './search-doctors.component.html',
  styleUrl: './search-doctors.component.css'
})
export class SearchDoctorsComponent {

  searchQuery: string = '';
  doctors: Doctor[] = [];
  filteredDoctors: Doctor[] = [];
  loading: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getDoctors();
  }

  getDoctors() {
    this.loading = true;
    this.http.get<Doctor[]>('http://localhost:8000/api/doctors').subscribe(
      (response) => {
        this.doctors = response;
        this.filterDoctors();
        this.loading = false;
      },
      (error) => {
        console.error('حدث خطأ أثناء جلب بيانات الأطباء:', error);
        this.loading = false;
      }
    );
  }

  filterDoctors() {
    this.filteredDoctors = this.doctors.filter(doctor =>
      doctor.name.includes(this.searchQuery) || doctor.specialization.includes(this.searchQuery)
    );
  }
}


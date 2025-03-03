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
  doctors: Doctor[] = []; // تخصيص قيمة افتراضية كـ Array فارغ
  filteredDoctors: Doctor[] = [];
  loading: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getDoctors();
  }

  getDoctors() {
    this.loading = true;
    this.http.get<{ doctors: Doctor[] }>('https://api-doctor.clingroup.net/api/doctors').subscribe(
      (response) => {
        if (!response || !Array.isArray(response.doctors)) {
          console.error('البيانات المستلمة غير صالحة:', response);
          this.doctors = [];
        } else {
          this.doctors = response.doctors; // الوصول إلى الخاصية doctors
        }
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
    if (!Array.isArray(this.doctors)) {
      console.error('this.doctors ليست Array:', this.doctors);
      this.filteredDoctors = [];
      return;
    }

    const query = this.searchQuery.toLowerCase();
    this.filteredDoctors = this.doctors.filter(doctor =>
      doctor.name.toLowerCase().includes(query) || doctor.specialization.toLowerCase().includes(query)
    );
  }
}

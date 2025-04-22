import { Component } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
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

  constructor(private doctorService: DoctorService) {}

  ngOnInit() {
    this.getDoctors();
  }

  getDoctors() {
    this.loading = true;
    this.doctorService.getDoctors().subscribe(
//     this.http.get<{ doctors: Doctor[] }>('https://api-doctor.clingroup.net/api/doctors').subscribe(
    (doctors) => {
              if (!doctors || !Array.isArray(doctors)) {
                console.error('البيانات المستلمة غير صالحة:', doctors);
                this.doctors = [];
              } else {
                this.doctors = doctors;
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



// import { Component } from '@angular/core';
// import { DoctorService } from '../../services/doctor.service';
// import { Doctor } from '../../models/doctor.model';

// @Component({
//   selector: 'app-search-doctors',
//   templateUrl: './search-doctors.component.html',
//   styleUrl: './search-doctors.component.css'
// })
// export class SearchDoctorsComponent {

//   searchQuery: string = '';
//   doctors: Doctor[] = [];
//   filteredDoctors: Doctor[] = [];
//   loading: boolean = false;

//   constructor(private doctorService: DoctorService) {}

//   ngOnInit() {
//     this.getDoctors();
//   }

//   getDoctors() {
//     this.loading = true;
//     this.doctorService.getDoctors().subscribe(
//       (doctors) => {
//         if (!doctors || !Array.isArray(doctors)) {
//           console.error('البيانات المستلمة غير صالحة:', doctors);
//           this.doctors = [];
//         } else {
//           this.doctors = doctors;
//         }
//         this.filterDoctors();
//         this.loading = false;
//       },
//       (error) => {
//         console.error('حدث خطأ أثناء جلب بيانات الأطباء:', error);
//         this.loading = false;
//       }
//     );
//   }

//   filterDoctors() {
//     if (!Array.isArray(this.doctors)) {
//       console.error('this.doctors ليست Array:', this.doctors);
//       this.filteredDoctors = [];
//       return;
//     }

//     const query = this.searchQuery.toLowerCase();
//     this.filteredDoctors = this.doctors.filter(doctor =>
//       doctor.name.toLowerCase().includes(query) || doctor.specialization.toLowerCase().includes(query)
//     );
//   }
// }

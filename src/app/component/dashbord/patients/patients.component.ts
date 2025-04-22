import { Component } from '@angular/core';
import { PatientsService } from '../../../services/patients.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css'
})
export class PatientsComponent {

  user: { name: string } = { name: ''}; // بيانات المستخدم

  patients: any[] = [];
  constructor(private authService: AuthService ,private patientsService: PatientsService) { }

  ngOnInit(): void {

           // جلب بيانات المستخدم
           this.authService.getUser().subscribe(userData => {
            this.user = userData;
          });

    // this.patientsService.getPatients().subscribe(
    //   (data) => {
    //     this.patients = data;
    //   },
    //   (error) => {
    //     console.error('Error fetching patients:', error);
    //   }
    // );
  }
}





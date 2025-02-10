import { Component } from '@angular/core';
import { PatientsService } from '../../../services/patients.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css'
})
export class PatientsComponent {

  patients: any[] = [];
  constructor(private patientsService: PatientsService) { }

  ngOnInit(): void {
    this.patientsService.getPatients().subscribe(
      (data) => {
        this.patients = data;
      },
      (error) => {
        console.error('Error fetching patients:', error);
      }
    );
  }
}


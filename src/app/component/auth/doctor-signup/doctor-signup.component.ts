import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { DoctorService } from '../../../services/doctor.service';
import { AuthService } from '../../../services/auth.service';
import { Doctor } from '../../../models/doctor.model';

@Component({
  selector: 'app-doctor-signup',
  templateUrl: './doctor-signup.component.html',
  styleUrl: './doctor-signup.component.css'
})
export class DoctorSignupComponent {

  doctorForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private authservice: AuthService) { 
    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      license_number: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      specialization: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      certificate: [null, Validators.required]
    });
  }


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.doctorForm.patchValue({
      certificate: this.selectedFile
    });
    this.doctorForm.get('certificate')?.updateValueAndValidity();
  }


  onSubmit() {
    if (this.doctorForm.valid && this.selectedFile) {
      const doctorData: Doctor = {
        ...this.doctorForm.value,
        certificate: this.selectedFile
      };

      this.authservice.registerDoctor(doctorData).subscribe({
        next: (response: any) => {
          console.log('Success:', response);
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error:', error);
        }
      });
    }
  }
  
}




import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-patient-signup',
  templateUrl: './patient-signup.component.html',
  styleUrl: './patient-signup.component.css'
})
export class PatientSignupComponent {

  patientForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.patientForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]] // إضافة كلمة المرور والتحقق من صحتها
    });
  }

  onSubmit() {
    if (this.patientForm.valid) {
      console.log('بيانات المريض:', this.patientForm.value);
      alert('تم التسجيل بنجاح!');
      this.patientForm.reset();
    }else{
      alert('فشل التسجيل')
    }
  }
}

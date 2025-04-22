import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { authPatient } from '../../../models/authPatient.model';


@Component({
  selector: 'app-patient-signup',
  templateUrl: './patient-signup.component.html',
  styleUrl: './patient-signup.component.css'
})
export class PatientSignupComponent {

  patientForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.patientForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', [Validators.required]]  // إضافة حقل تأكيد كلمة المرور
    }, { validators: this.passwordMatchValidator });  // إضافة الدالة للتحقق من تطابق كلمة المرور
  }

  // دالة للتحقق من تطابق كلمة المرور مع التأكيد
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('password_confirmation')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  
  onSubmit() {
    if (this.patientForm.valid) {
      // const patientData: authPatient = this.patientForm.value;
      const { confirmPassword, ...patientData } = this.patientForm.value; // إزالة confirmPassword إذا كان موجود

      this.authService.registerPatient(patientData).subscribe({
        next: (res) => {
          console.log('تم التسجيل بنجاح:', res);
          alert('تم تسجيل المريض بنجاح!');
          this.patientForm.reset();
        },
        error: (err) => {
          console.error('خطأ في التسجيل:', err);
          alert('فشل التسجيل، تحقق من البيانات.');
        }
      });

    } else {
      alert('يرجى تعبئة جميع الحقول بشكل صحيح.');
    }
  }
}


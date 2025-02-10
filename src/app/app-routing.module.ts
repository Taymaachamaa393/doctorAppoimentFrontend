import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { HeaderComponent } from './component/share/header/header.component';
import { FooterComponent } from './component/share/footer/footer.component';
import { SearchDoctorsComponent } from './component/search-doctors/search-doctors.component';
import { ReportsComponent } from './component/reports/reports/reports.component';
import { PatientsComponent } from './component/dashbord/patients/patients.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { AppointmentsComponent } from './component/appointments/appointments.component';
import { DoctorComponent } from './component/dashbord/doctor/doctor.component';
import { DoctorSignupComponent } from './component/auth/doctor-signup/doctor-signup.component';
import { AdminComponent } from './component/dashbord/admin/admin.component';
import { PatientSignupComponent } from './component/auth/patient-signup/patient-signup.component';
import { LoginComponent } from './component/auth/login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { roleGuard } from './guard/role.guard';

const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'doctorSignup', component: DoctorSignupComponent },
  { path: 'patientSignup', component: PatientSignupComponent },
  { path: 'patient', component: PatientsComponent },
  { path: 'home', component: HomeComponent },

  { path: 'header', component: HeaderComponent},
  { path: 'footer', component: FooterComponent },



  // مسار عام متاح فقط للمستخدمين الذين سجلوا دخولهم
  { path: 'Patients', component: PatientsComponent,canActivate:[AuthGuard] },
  { path: 'search-doctors', component: SearchDoctorsComponent,canActivate:[AuthGuard] },


  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [roleGuard],
    data: { role: 'admin' },
    children: [

      { path: '', redirectTo: 'admin', pathMatch: 'full' },
      { path: 'Patients', component: PatientsComponent },
      { path: 'search-doctors', component: SearchDoctorsComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'notification', component: NotificationsComponent },
      { path: 'appointments', component: AppointmentsComponent },

    ]
  },
  {
    path: 'doctor',
    component: DoctorComponent,
    canActivate: [roleGuard],
    data: { role: 'doctor' },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },  // المسار الافتراضي
      { path: 'Patients', component: PatientsComponent },
      { path: 'search-doctors', component: SearchDoctorsComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'notification', component: NotificationsComponent },
      { path: 'appointments', component: AppointmentsComponent },

    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

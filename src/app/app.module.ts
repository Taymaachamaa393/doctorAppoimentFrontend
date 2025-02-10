import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // استيراد ReactiveFormsModule

        //InterCeptor
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppointmentsComponent } from './component/appointments/appointments.component';
import { FooterComponent } from './component/share/footer/footer.component';
import { HomeComponent } from './component/home/home.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PatientsComponent } from './component/dashbord/patients/patients.component';
import { ReportsComponent } from './component/reports/reports/reports.component';
import { SearchDoctorsComponent } from './component/search-doctors/search-doctors.component';
import { AdminComponent } from './component/dashbord/admin/admin.component';
import { DoctorComponent } from './component/dashbord/doctor/doctor.component';
import { LoginComponent } from './component/auth/login/login.component';
import { DoctorSignupComponent } from './component/auth/doctor-signup/doctor-signup.component';
import { PatientSignupComponent } from './component/auth/patient-signup/patient-signup.component';
import { HeaderComponent } from './component/share/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    AppointmentsComponent,
    FooterComponent,
    HomeComponent,
    NotificationsComponent,
    PatientsComponent,
    ReportsComponent,
    SearchDoctorsComponent,
    AdminComponent,
    DoctorComponent,
    LoginComponent,
    DoctorSignupComponent,
    PatientSignupComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withInterceptors([authInterceptor])) 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }






import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsDoctorComponent } from './patients-doctor.component';

describe('PatientsDoctorComponent', () => {
  let component: PatientsDoctorComponent;
  let fixture: ComponentFixture<PatientsDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientsDoctorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientsDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

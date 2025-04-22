import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsPatientsComponent } from './appointments-patients.component';

describe('AppointmentsPatientsComponent', () => {
  let component: AppointmentsPatientsComponent;
  let fixture: ComponentFixture<AppointmentsPatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppointmentsPatientsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentsPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

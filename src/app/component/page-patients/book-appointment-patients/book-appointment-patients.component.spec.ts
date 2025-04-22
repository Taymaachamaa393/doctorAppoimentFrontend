import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAppointmentPatientsComponent } from './book-appointment-patients.component';

describe('BookAppointmentPatientsComponent', () => {
  let component: BookAppointmentPatientsComponent;
  let fixture: ComponentFixture<BookAppointmentPatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookAppointmentPatientsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookAppointmentPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
